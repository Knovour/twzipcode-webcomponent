import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { countyTranslations, districtTranslations } from './data/translations'
import type { County, District, IgnoreDistricts, Lang, TwZipcodeData } from './typed'

@customElement('district-field')
export class DistrictField extends LitElement {
	@property({ type: String }) classes = ''
	@property({ type: String }) name = 'district'
	@property({ type: String }) placeholder = '---'

	@state() lang: Lang = 'zh-tw'
	@state() value = '' as District | ''
	@state() private _ignoreList: IgnoreDistricts = {}
	@state() private _options: District[] = []

	@query('select') private $_select: HTMLSelectElement

	public readonly tag = 'district'

	updated(changedProps: PropertyValues) {
		if (changedProps.has('value')) {
			this.dispatchEvent(
				new CustomEvent('update:district', {
					detail: { value: this.value },
					bubbles: true,
					composed: true,
				})
			)
		}
	}

	public reload(data: TwZipcodeData[], county: County) {
		if (!county) {
			return
		}

		let opts = data.filter(({ county: c }) => c === county).map(({ district }) => district)
		if (county in this._ignoreList) {
			const ignoreDistricts = this._ignoreList[county]
			opts = opts.filter(d => !ignoreDistricts?.includes(d as District))
		}

		this._options = opts
		this.select()
	}

	public ignore(list: IgnoreDistricts[]) {
		let ignoreList = list.reduce((acc, opt) => ({ ...acc, ...opt }), {})
		if (this.lang === 'en') {
			ignoreList = (Object.entries(ignoreList) as [County, District[]][]).reduce((acc, [key, value]) => {
				return {
					...acc,
					[countyTranslations.get(key) ?? key]: value.map(v => districtTranslations.get(v) ?? v),
				}
			}, {})
		}

		this._ignoreList = ignoreList
	}

	public findAndSelect(data: TwZipcodeData[], zipcode: string) {
		const value = zipcode.length === 3 ? (data.find(({ zipcode: z }) => z === zipcode)?.district ?? '') : ''
		this.select(value)
	}

	public select(value: District | '' = '') {
		this.value = value && this._options.includes(value) ? value : ''
		if (!this.value) {
			this.$_select.value = ''
		}
	}

	private _handleEvent(e: { target: HTMLSelectElement }) {
		this.select(e.target.value as District)
	}

	createRenderRoot() {
		return this
	}

	render() {
		return html`
      <select class="${this.classes}" name=${this.name} ?disabled=${!this._options.length} @change=${this._handleEvent}>
        <option value="" ?selected=${!this.value} disabled>${this.placeholder}</option>
        ${this._options.map(d => html`<option value=${d} ?selected=${this.value === d}>${d}</option>`)}
      </select>
    `
	}
}
