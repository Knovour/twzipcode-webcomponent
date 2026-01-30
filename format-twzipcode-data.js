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
	const countyListName = lang === 'zh-tw' ? 'zhCountyList' : 'enCountyList'
	const districtListName = lang === 'zh-tw' ? 'zhDistrictList' : 'enDistrictList'

	const fmtData =
		lang === 'zh-tw'
			? zhData.map(({ zipcode, county, city: district }) =>
					JSON.stringify([
						zhCountyList.indexOf(county),
						zhDistrictList.indexOf(district),
						zipcodeList.indexOf(zipcode.toString()),
					])
				)
			: enData.map(({ zipcode, county, city: district }) =>
					JSON.stringify([
						enCountyList.indexOf(county),
						enDistrictList.indexOf(district),
						zipcodeList.indexOf(zipcode.toString()),
					])
				)

	fs.writeFileSync(
		`src/data/${lang}.ts`,
		`import type { TwZipcodeData } from '../typed'
import { ${countyListName}, ${districtListName}, zipcodeList } from './list'

const data = [${fmtData.join(',')}]

export default data.map(([c, d, z]) => ({ county: ${countyListName}[c], district: ${districtListName}[d], zipcode: zipcodeList[z] })) as TwZipcodeData[]`
	)

	console.log(`${lang} 已寫入`)
}

function translations() {
	const { zipcodes, counties } = twzipcode('en')
	const countyList = counties.map(({ id, name }) =>
		JSON.stringify([zhCountyList.indexOf(id), enCountyList.indexOf(name)])
	)
	// 把重複的 key 篩掉
	const districtList = [
		...new Map(
			zipcodes.map(({ id, city: district }) => {
				/** en 的 zipcodes 資料結構如下
				 * { 'id': '100臺北市中正區', 'zipcode': 100, 'county': 'Taipei City', 'city': 'Zhongzheng District' }
				 * id 前面六個字元是 zipcode 跟 county，去掉之後剩下的才是鄉鎮市區
				 */
				return [id.slice(6), district]
			})
		),
	].map(([k, v]) => JSON.stringify([zhDistrictList.indexOf(k), enDistrictList.indexOf(v)]))

	fs.writeFileSync(
		`src/data/translations.ts`,
		`import type { County, District } from '../typed'
import { zhCountyList, zhDistrictList, enCountyList, enDistrictList } from './list'

const countyZhToEn = [${countyList.join(',')}]
const districtZhToEn = [${districtList.join(',')}]

export const countyTranslations = new Map<County, County>(
	countyZhToEn.flatMap(([zh, en]) => [[zhCountyList[zh], enCountyList[en]], [enCountyList[en], zhCountyList[zh]]]) as [County, County][]
)

export const districtTranslations = new Map<District, District>(
	districtZhToEn.flatMap(([zh, en]) => [[zhDistrictList[zh], enDistrictList[en]], [enDistrictList[en], zhDistrictList[zh]]]) as [District, District][]
)`
	)

	console.log(`translations 已寫入`)
}
