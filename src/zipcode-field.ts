import { html, LitElement, PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { Lang, Zipcode } from './typed'

@customElement('zipcode-field')
export class ZipcodeField extends LitElement {
	@property({ type: String }) classes = ''
	@property({ type: String }) name = 'zipcode'
	@property({ type: String }) placeholder = ''

	@property({ type: String, attribute: false }) lang: Lang = 'zh-tw'
	@property({ type: String, attribute: false }) value = '' as Zipcode | ''

	willUpdate(changedProps: PropertyValues) {
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
