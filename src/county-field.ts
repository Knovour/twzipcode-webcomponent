import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { enCountyList, zhCountyList } from './data/list'
import { countyTranslations } from './data/translations'
import type { County, Lang } from './typed'

@customElement('county-field')
export class CountyField extends LitElement {
	@property({ type: String }) classes = ''
	@property({ type: String }) name = 'county'
	@property({ type: String }) placeholder = '---'

	@property({ type: String, attribute: false }) lang: Lang = 'zh-tw'
	@property({ type: String, attribute: false }) value = '' as County | ''
	@property({ type: Array, attribute: false }) ignoreOptions: County[] = []

	@state() private _options: County[] = []

	@query('select') private $_select: HTMLSelectElement

	willUpdate(changedProps: PropertyValues) {
		if (changedProps.has('lang') || changedProps.has('ignoreOptions')) {
			this._updateOptions()
			this._select(this.value)
		}
	}

	updated(changedProps: PropertyValues) {
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

	private _updateOptions() {
		const counties = (this.lang === 'en' ? enCountyList : zhCountyList) as unknown as County[]
		const ignoreList =
			this.lang === 'en' ? this.ignoreOptions.map(name => countyTranslations.get(name) ?? name) : this.ignoreOptions

		this._options = ignoreList.length ? counties.filter(c => !ignoreList.includes(c)) : counties
	}

	private _handleEvent(e: { target: HTMLSelectElement }) {
		this._select(e.target.value as County)
	}

	private _select(value: County | '') {
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
      <select class="${this.classes}" name=${this.name} @change=${this._handleEvent}>
        <option value="" ?selected=${!this.value} disabled>${this.placeholder}</option>
        ${this._options.map(c => html`<option value=${c} ?selected=${this.value === c}>${c}</option>`)}
      </select>
    `
	}
}
