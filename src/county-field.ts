import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { enCountyList, zhCountyList } from './data/list'
import { countyTranslations } from './data/translations'
import type { County, Lang, TwZipcodeData } from './typed'

@customElement('county-field')
export class CountyField extends LitElement {
	@property({ type: String }) classes = ''
	@property({ type: String }) name = 'county'
	@property({ type: String }) placeholder = '---'

	@state() lang: Lang = 'zh-tw'
	@state() value = '' as County | ''
	@state() private _options: County[] = []

	@query('select') private $_select: HTMLSelectElement

	public readonly tag = 'county'
	private _counties: County[] = []

	updated(changedProps: PropertyValues) {
		if (changedProps.has('lang') && !!changedProps.get('lang')) {
			this.reload()
		}

		if (changedProps.has('value')) {
			this.dispatchEvent(
				new CustomEvent('update:county', {
					detail: { value: this.value },
					bubbles: true,
					composed: true,
				})
			)
		}
	}

	public reload() {
		this._counties = (this.lang !== 'en' ? zhCountyList : enCountyList) as unknown as County[]
		this._updateOptions()
	}

	public ignore(list: County[]) {
		this._updateOptions(this.lang !== 'en' ? list : list.map(name => countyTranslations.get(name) ?? name))
	}

	public findAndSelect(data: TwZipcodeData[], particalZipcode: string) {
		this.select(data.find(({ zipcode: z }) => z.startsWith(particalZipcode))?.county ?? '')
	}

	public select(value: County | '') {
		this.value = value && this._options.includes(value) ? value : ''
		if (!this.value && this.$_select) {
			this.$_select.value = ''
		}
	}

	private _updateOptions(ignoreList: County[] = []) {
		this._options = ignoreList.length ? this._counties.filter(c => !ignoreList.includes(c)) : this._counties
		this.select(this.value)
	}

	private _handleEvent(e: { target: HTMLSelectElement }) {
		this.select(e.target.value as County)
	}

	createRenderRoot() {
		return this
	}

	render() {
		return html`
      <select class="${this.classes}" name=${this.name} @change=${this._handleEvent}>
        <option value="" ?selected=${!this.value} disabled>${this.placeholder}</option>
        ${this._options.map(c => html`<option value=${c} ?selected=${this.value === c}>${c}</option>`)}
      </select>
    `
	}
}
