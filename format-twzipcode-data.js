import fs from 'fs'
import twzipcode from 'twzipcode-data'

const zhData = twzipcode('zh-tw').zipcodes
const enData = twzipcode('en').zipcodes

const zhCountyList = [...new Set(zhData.map(({ county }) => county))]
const enCountyList = [...new Set(enData.map(({ county }) => county))]
const zhDistrictList = [...new Set(zhData.map(({ city }) => city))]
const enDistrictList = [...new Set(enData.map(({ city }) => city))]
const zipcodeList = [...new Set(zhData.map(({ zipcode }) => zipcode.toString()))]

fs.writeFileSync(
	`src/data/list.ts`,
	`export const zhCountyList = ${JSON.stringify(zhCountyList)} as const
export const enCountyList = ${JSON.stringify(enCountyList)} as const
export const zhDistrictList = ${JSON.stringify(zhDistrictList)} as const
export const enDistrictList = ${JSON.stringify(enDistrictList)} as const
export const zipcodeList = ${JSON.stringify(zipcodeList)} as const
`
)

migration('zh-tw')
migration('en')
translations()

function migration(lang) {
	const importList = lang === 'zh-tw' ? 'zhCountyList, zhDistrictList' : 'enCountyList, enDistrictList'
	const fmtData =
		lang === 'zh-tw'
			? zhData.map(({ zipcode, county, city: district }) =>
					prettify({
						county: `zhCountyList[${zhCountyList.indexOf(county)}]`,
						district: `zhDistrictList[${zhDistrictList.indexOf(district)}]`,
						zipcode: `zipcodeList[${zipcodeList.indexOf(zipcode.toString())}]`,
					})
				)
			: enData.map(({ zipcode, county, city: district }) =>
					prettify({
						county: `enCountyList[${enCountyList.indexOf(county)}]`,
						district: `enDistrictList[${enDistrictList.indexOf(district)}]`,
						zipcode: `zipcodeList[${zipcodeList.indexOf(zipcode.toString())}]`,
					})
				)

	fs.writeFileSync(
		`src/data/${lang}.ts`,
		`import type { TwZipcodeData } from '../typed'
import { ${importList}, zipcodeList } from './list'

export default [
	${fmtData.join(',\n\t')}
] as TwZipcodeData[]`
	)

	console.log(`${lang} 已寫入`)
}

function translations() {
	const { zipcodes, counties } = twzipcode('en')
	const countyList = counties.map(({ id, name }) =>
		prettify([`zhCountyList[${zhCountyList.indexOf(id)}]`, `enCountyList[${enCountyList.indexOf(name)}]`])
	)
	// 把重複的 key 篩掉
	const districtList = [...new Map(zipcodes.map(({ id, city: district }) => [id.slice(6), district]))].map(([k, v]) =>
		prettify([`zhDistrictList[${zhDistrictList.indexOf(k)}]`, `enDistrictList[${enDistrictList.indexOf(v)}]`])
	)

	fs.writeFileSync(
		`src/data/translations.ts`,
		`import type { County, District } from '../typed'
import { zhCountyList, zhDistrictList, enCountyList, enDistrictList } from './list'

const countyZhToEn = [
	${countyList.join(',\n\t')}
] as [County, County][]
export const countyTranslations = new Map<County, County>(
	[countyZhToEn, countyZhToEn.map(c => [c[1], c[0]] as const)].flat()
)

const districtZhToEn = [
	${districtList.join(',\n\t')}
] as [District, District][]
export const districtTranslations = new Map<District, District>(
	[districtZhToEn, districtZhToEn.map(d => [d[1], d[0]] as const)].flat()
)`
	)

	console.log(`translations 已寫入`)
}

function prettify(data) {
	return JSON.stringify(data)
		.replaceAll(/({|:|,)/g, '$1 ')
		.replace('}', ' }')
		.replaceAll(/"(zipcode|county|district)"/g, '$1')
		.replaceAll(']"', ']')
		.replaceAll(/"(z|en)/g, '$1') // zhXXXList, enXXXList
}
