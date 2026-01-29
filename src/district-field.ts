import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { districtTranslations } from './data/translations'
import type { District, Lang } from './typed'

@customElement('district-field')
export class DistrictField extends LitElement {
	@property({ type: String }) classes = ''
	@property({ type: String }) name = 'district'
	@property({ type: String }) placeholder = '---'

	@property({ type: String, attribute: false }) lang: Lang = 'zh-tw'
	@property({ type: String, attribute: false }) value = '' as District | ''
	@property({ type: Array, attribute: false }) districts: District[] = []
	@property({ type: Array, attribute: false }) ignoreOptions: District[] = []

	@state() private _options: District[] = []

	@query('select') private $_select: HTMLSelectElement

	willUpdate(changedProps: PropertyValues) {
		if (changedProps.has('districts') || changedProps.has('ignoreOptions')) {
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
		const ignoreList =
			this.lang !== 'en' ? this.ignoreOptions : this.ignoreOptions.map(v => districtTranslations.get(v) ?? v)
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
