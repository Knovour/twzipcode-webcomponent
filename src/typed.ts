import { enCountyList, enDistrictList, zhCountyList, zhDistrictList, zipcodeList } from './data/list'

export type Zipcode = (typeof zipcodeList)[number]
export type County = (typeof zhCountyList)[number] | (typeof enCountyList)[number]
export type District = (typeof zhDistrictList)[number] | (typeof enDistrictList)[number]

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
