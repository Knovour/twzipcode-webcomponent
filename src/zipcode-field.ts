import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { Lang, TwZipcodeData, Zipcode } from './typed'

@customElement('zipcode-field')
export class ZipcodeField extends LitElement {
	@property({ type: String }) classes = ''
	@property({ type: String }) name = 'zipcode'
	@property({ type: String }) placeholder = ''

	@state() lang: Lang = 'zh-tw'
	@state() value = '' as Zipcode | ''

	public readonly tag = 'zipcode'

	updated(changedProps: PropertyValues) {
		if (changedProps.has('value')) {
			this.dispatchEvent(
				new CustomEvent('update:zipcode', {
					detail: { value: this.value },
					bubbles: true,
					composed: true,
				})
			)
		}
	}

	public findAndWrite(data: TwZipcodeData[], current: Pick<TwZipcodeData, 'county' | 'district'>) {
		const value =
			data.find(({ county, district }) => county === current.county && district === current.district)?.zipcode ?? ''
		this.write(value)
	}

	public write(value: Zipcode | '') {
		this.value = value
	}

	createRenderRoot() {
		return this
	}

	render() {
		return html`
      <input
      	class="${this.classes}"
        type="tel"
        name=${this.name}
        .value=${this.value}
        placeholder=${this.placeholder}
        maxlength="3"
        readonly
      >
    `
	}
}
