import { html, LitElement, type PropertyValues } from 'lit'
import { query } from 'lit/decorators/query.js'
import { customElement, property, state } from 'lit/decorators.js'
import type { CountyField } from './county-field'
import enData from './data/en'
import zhData from './data/zh-tw'
import type { DistrictField } from './district-field'
import type { County, District, Field, IgnoreDistricts, IgonreOptions, Lang, TwZipcodeData } from './typed'
import type { ZipcodeField } from './zipcode-field'

@customElement('twzipcode-fieldset')
export class TwzipcodeFieldset extends LitElement {
	@property({ type: String }) lang: Lang = 'zh-tw'
	@property({ type: Object, attribute: 'default-values' }) defaultValues?: TwZipcodeData
	@property({ type: Array, attribute: 'ignore-options' }) ignoreOptions?: IgonreOptions

	@state() private _data: TwZipcodeData[] = zhData
	@state() value: Partial<TwZipcodeData> = { zipcode: undefined, county: undefined, district: undefined }

	@query('zipcode-field') private $_zipcode?: ZipcodeField
	@query('county-field') private $_county?: CountyField
	@query('district-field') private $_district?: DistrictField

	private readonly _countyUpdateHandler = this._handleCountyUpdate.bind(this)
	private readonly _districtUpdateHandler = this._handleDistrictUpdate.bind(this)
	private readonly _zipcodeUpdateHandler = this._handleZipcodeUpdate.bind(this)

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue === newValue) {
			return
		}

		requestAnimationFrame(() => {
			switch (name) {
				case 'lang':
					this._data = newValue !== 'en' ? zhData : enData
					;[this.$_zipcode, this.$_county, this.$_district].forEach($elem => {
						if ($elem) {
							$elem.lang = newValue as Lang
						}
					})
					break
				case 'default-values':
					this._writeDefaultValues(newValue)
					break
				case 'ignore-options':
					this._updateIgnoreOpts(newValue)
			}
		})
	}

	connectedCallback() {
		super.connectedCallback()
		this.addEventListener('update:zipcode', this._zipcodeUpdateHandler)
		this.addEventListener('update:county', this._countyUpdateHandler)
		this.addEventListener('update:district', this._districtUpdateHandler)

		if (!this.hasChildNodes()) {
			;['zipcode-field', 'county-field', 'district-field'].forEach(tag => {
				this.appendChild(document.createElement(tag))
			})
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.removeEventListener('update:zipcode', this._zipcodeUpdateHandler)
		this.removeEventListener('update:county', this._countyUpdateHandler)
		this.removeEventListener('update:district', this._districtUpdateHandler)
	}

	updated(changedProps: PropertyValues) {
		if (changedProps.has('_data')) {
			this.$_county?.reload(this.lang)
		}

		if (changedProps.has('value')) {
			this._dispatch(this.value as TwZipcodeData)
		}
	}

	private _writeDefaultValues(newValue: string) {
		const { zipcode, county, district } = this._parseJSON(newValue, {} as TwZipcodeData)
		if (this._data.some(({ zipcode: z, county: c, district: d }) => z === zipcode && c === county && d === district)) {
			this.$_zipcode?.write(zipcode)
			this.$_county?.select(county)
			//等 _handleCountyUpdate 跑完
			requestAnimationFrame(() => this.$_district?.select(district))
		}
	}

	private _updateIgnoreOpts(newValue: string) {
		const ignoreOpts = this._parseJSON(newValue, []) as IgonreOptions
		const { c = [], d = [] } = Object.groupBy(ignoreOpts, opt => (typeof opt === 'string' ? 'c' : 'd'))

		this.$_county?.ignore(c as County[])
		this.$_district?.ignore(d as IgnoreDistricts[])
	}

	private _parseJSON<T>(value: string, fallback: T): T {
		try {
			return JSON.parse(value) ?? fallback
		} catch (error) {
			console.warn('Failed to parse JSON:', value, error)
			return fallback
		}
	}

	private _handleZipcodeUpdate(e: Event) {
		this._updateValue('zipcode', e as CustomEvent)
	}

	private _handleCountyUpdate(e: Event) {
		const county = this._updateValue('county', e as CustomEvent) as County
		this.$_district?.reload(this._data, county)
	}

	private _handleDistrictUpdate(e: Event) {
		const district = this._updateValue('district', e as CustomEvent) as District
		this.$_zipcode?.findAndWrite(this._data, { county: this.value.county as County, district })
	}

	private _updateValue(key: Field, { detail }: CustomEvent): string {
		this.value = { ...this.value, [key]: detail.value }
		return detail.value
	}

	private _dispatch(value: TwZipcodeData) {
		// pending
		if (Object.values(value).some(v => !v)) {
			return
		}

		const isExist = this._data.some(({ zipcode: z, county: c, district: d }) => {
			return z === value.zipcode && c === value.county && d === value.district
		})
		if (isExist) {
			this.dispatchEvent(new CustomEvent('done', { detail: { value } }))
		}
	}

	createRenderRoot() {
		return this
	}

	render() {
		return html``
	}
}
