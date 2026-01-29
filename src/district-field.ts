import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { countyTranslations, districtTranslations } from './data/translations'
import type { County, District, IgnoreDistricts, Lang } from './typed'

@customElement('district-field')
export class DistrictField extends LitElement {
	@property({ type: String }) classes = ''
	@property({ type: String }) name = 'district'
	@property({ type: String }) placeholder = '---'

	@property({ type: String, attribute: false }) lang: Lang = 'zh-tw'
	@property({ type: String, attribute: false }) value = '' as District | ''
	@property({ type: String, attribute: false }) county: County | '' = ''
	@property({ type: Array, attribute: false }) districts: District[] = []
	@property({ type: Object, attribute: false }) ignoreOptions: IgnoreDistricts = {}

	@state() private _options: District[] = []

	@query('select') private $_select: HTMLSelectElement

	willUpdate(changedProps: PropertyValues) {
		if (
			changedProps.has('districts') ||
			changedProps.has('ignoreOptions') ||
			changedProps.has('lang') ||
			changedProps.has('county')
		) {
			this._updateOptions()
			this._select(this.value)
		}
	}

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

	private _updateOptions() {
		const countyKey = this.lang === 'en' && this.county ? countyTranslations.get(this.county) : this.county
		if (!countyKey) {
			this._options = []
			return
		}

		const ignoreOptions = this.ignoreOptions[countyKey] ?? []
		const ignoreList = this.lang === 'en' ? ignoreOptions.map(v => districtTranslations.get(v) ?? v) : ignoreOptions
		this._options = this.districts.filter(d => !ignoreList.includes(d))
	}

	private _handleEvent(e: { target: HTMLSelectElement }) {
		this._select(e.target.value as District)
	}

	private _select(value: District | '' = '') {
		this.value = value && this._options.includes(value) ? value : ''
		if (!this.value && this.$_select) {
			this.$_select.value = ''
		}
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
