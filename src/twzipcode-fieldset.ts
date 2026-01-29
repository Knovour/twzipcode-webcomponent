import { html, LitElement, type PropertyValues } from 'lit'
import { query } from 'lit/decorators/query.js'
import { customElement, property, state } from 'lit/decorators.js'
import type { CountyField } from './county-field'
import enData from './data/en'
import zhData from './data/zh-tw'
import type { DistrictField } from './district-field'
import type { County, District, IgnoreDistricts, Lang, TwZipcodeData } from './typed'
import type { ZipcodeField } from './zipcode-field'

@customElement('twzipcode-fieldset')
export class TwzipcodeFieldset extends LitElement {
	@property({ type: String }) lang: Lang = 'zh-tw'
	@property({ type: Object, attribute: 'default-values' }) defaultValues?: TwZipcodeData
	@property({ type: Array, attribute: 'ignore-counties' }) ignoreCounties: County[] = []
	@property({ type: Object, attribute: 'ignore-districts' }) ignoreDistricts: IgnoreDistricts = {}

	@state() private _data: TwZipcodeData[] = zhData
	@state() value: Partial<TwZipcodeData> = { zipcode: undefined, county: undefined, district: undefined }
	@state() private _lastValue = ''

	@query('zipcode-field') private $_zipcode?: ZipcodeField
	@query('county-field') private $_county?: CountyField
	@query('district-field') private $_district?: DistrictField

	private readonly _countyUpdateHandler = this._handleCountyUpdate.bind(this)
	private readonly _districtUpdateHandler = this._handleDistrictUpdate.bind(this)
	private readonly _zipcodeUpdateHandler = this._handleZipcodeUpdate.bind(this)

	willUpdate(changedProps: PropertyValues) {
		if (changedProps.has('lang')) {
			this._data = this.lang !== 'en' ? zhData : enData
			;[this.$_zipcode, this.$_county, this.$_district].forEach($elem => {
				if ($elem) {
					$elem.lang = this.lang
				}
			})
		}

		if (changedProps.has('defaultValues') && this.defaultValues) {
			const { zipcode, county, district } = this.defaultValues
			if (
				this._data.some(({ zipcode: z, county: c, district: d }) => z === zipcode && c === county && d === district)
			) {
				this.value = { zipcode, county, district }
			}
		}
	}

	updated(changedProps: PropertyValues) {
		if (changedProps.has('value')) {
			this._dispatch(this.value as TwZipcodeData)
		}

		if (changedProps.has('value') || changedProps.has('ignoreCounties') || changedProps.has('ignoreDistricts')) {
			this._syncChildren()
		}
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

	private _syncChildren() {
		if (this.$_zipcode) {
			this.$_zipcode.value = this.value.zipcode ?? ''
		}
		if (this.$_county) {
			this.$_county.value = this.value.county ?? ''
			this.$_county.ignoreOptions = this.ignoreCounties
		}
		if (this.$_district) {
			this.$_district.value = this.value.district ?? ''
			this.$_district.districts = this.value.county
				? this._data.filter(({ county: c }) => c === this.value.county).map(({ district }) => district)
				: []
			this.$_district.ignoreOptions = this.value.county ? (this.ignoreDistricts[this.value.county] ?? []) : []
		}
	}

	private _handleZipcodeUpdate(e: Event) {
		const zipcode = (e as CustomEvent).detail.value
		if (!zipcode || zipcode.length !== 3) {
			return
		}

		const target = this._data.find(d => d.zipcode === zipcode)
		if (target) {
			this.value = target
		}
	}

	private _handleCountyUpdate(e: Event) {
		this.value = { county: (e as CustomEvent).detail.value, district: undefined, zipcode: undefined }
	}

	private _handleDistrictUpdate(e: Event) {
		const district = (e as CustomEvent).detail.value as District
		const zipcode = this._data.find(
			({ county, district: d }) => county === this.value.county && d === district
		)?.zipcode

		this.value = { ...this.value, district, zipcode }
	}

	private _dispatch(value: TwZipcodeData) {
		const current = JSON.stringify(value)
		if (current === this._lastValue || Object.values(value).some(v => !v)) {
			return
		}

		const isExist = this._data.some(({ zipcode: z, county: c, district: d }) => {
			return z === value.zipcode && c === value.county && d === value.district
		})
		if (isExist) {
			this._lastValue = current
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
