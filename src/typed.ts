import { enCountyList, enDistrictList, zhCountyList, zhDistrictList, zipcodeList } from './data/list'

export type Zipcode = (typeof zipcodeList)[number]
export type ZhCounty = (typeof zhCountyList)[number]
export type EnCounty = (typeof enCountyList)[number]
export type County = ZhCounty | EnCounty
export type ZhDistrict = (typeof zhDistrictList)[number]
export type EnDistrict = (typeof enDistrictList)[number]
export type District = ZhDistrict | EnDistrict

export type Lang = 'zh-tw' | 'en'
export type Field = 'zipcode' | 'county' | 'district'

export type IgnoreDistricts = Partial<Record<County, District[]>>

export type TwZipcodeData = {
	zipcode: Zipcode
	county: County
	district: District
}

export type TwzipcodeEventMap = {
	'update:zipcode': CustomEvent<{ value: string }>
	'update:county': CustomEvent<{ value: string }>
	'update:district': CustomEvent<{ value: string }>
}

export interface TwzipcodeCustomEvent<T> extends CustomEvent<T> {
	target: (EventTarget & { value: string }) | null
}
