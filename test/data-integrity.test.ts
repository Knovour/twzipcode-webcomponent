import { describe, expect, test } from 'bun:test'
//@ts-ignore
import twzipcode from 'twzipcode-data'

import enGeneratedData from '../src/data/en'
import { countyTranslations, districtTranslations } from '../src/data/translations'
import zhGeneratedData from '../src/data/zh-tw'
import type { EnCounty, EnDistrict, ZhCounty, ZhDistrict } from '../src/typed'

describe('Data Integrity', () => {
	test('測試中文是否符合原資料', () => {
		const sourceData = twzipcode('zh-tw').zipcodes
		expect(zhGeneratedData.length).toBe(sourceData.length)

		for (let i = 0; i < sourceData.length; i++) {
			const src = sourceData[i]
			const gen = zhGeneratedData[i]

			expect(gen.zipcode).toBe(src.zipcode.toString())
			expect(gen.county).toBe(src.county)
			expect(gen.district).toBe(src.city)
		}
	})

	test('測試英文是否符合原資料', () => {
		const sourceData = twzipcode('en').zipcodes
		expect(enGeneratedData.length).toBe(sourceData.length)

		for (let i = 0; i < sourceData.length; i++) {
			const src = sourceData[i]
			const gen = enGeneratedData[i]

			expect(gen.zipcode).toBe(src.zipcode.toString())
			expect(gen.county).toBe(src.county)
			expect(gen.district).toBe(src.city)
		}
	})
})

describe('翻譯正確性', () => {
	test('測試縣市翻譯是否正確', () => {
		const { counties } = twzipcode('en')
		for (const { id: zh, name: en } of counties) {
			expect(countyTranslations.get(zh as ZhCounty)).toBe(en as EnCounty)
			expect(countyTranslations.get(en as EnCounty)).toBe(zh as ZhCounty)
		}
	})

	test('測試鄉鎮市區翻譯是否正確', () => {
		const { zipcodes } = twzipcode('en')
		const expectedMap = new Map<ZhDistrict, EnDistrict>(
			//@ts-ignore
			// slice(6) 的部分參考 format-twzipcode-data.js 註解
			zipcodes.map(({ id, city: district }) => [id.slice(6), district])
		)

		for (const [zh, en] of expectedMap) {
			expect(districtTranslations.get(zh)).toBe(en)
		}

		//鄉鎮市區中文名稱不同，但英文可能相同
		const collisions = new Map<EnDistrict, Set<ZhDistrict>>()
		for (const [zh, en] of expectedMap) {
			if (!collisions.has(en)) {
				collisions.set(en, new Set())
			}
			collisions.get(en)!.add(zh)
		}

		for (const [zh, en] of expectedMap) {
			const result = districtTranslations.get(en) as ZhDistrict
			const validNames = collisions.get(en)!

			if (result !== zh) {
				expect(validNames.has(result)).toBe(true)
			} else {
				expect(result).toBe(zh)
			}
		}
	})

	test('鄉鎮市區中文名稱不同，但英文相同的部分', () => {
		/**
		 * Taoyuan District:
		 * 	330 桃園市桃園區
		 * 	848 高雄市桃源區
		 * Xihu Township:
		 * 	368 苗栗縣西湖鄉
		 * 	514 彰化縣溪湖鎮
		 * Luzhu District:
		 * 	338 桃園市蘆竹區
		 * 	821 高雄市路竹區
		 * Dongshi Township:
		 * 	614 嘉義縣東石鄉
		 * 	635 雲林縣東勢鄉
		 */
		const collisions = [
			{ zh: ['桃園區', '桃源區'], en: 'Taoyuan District' },
			{ zh: ['西湖鄉', '溪湖鎮'], en: 'Xihu Township' },
			{ zh: ['蘆竹區', '路竹區'], en: 'Luzhu District' },
			{ zh: ['東石鄉', '東勢鄉'], en: 'Dongshi Township' },
		] as { zh: ZhDistrict[]; en: EnDistrict }[]

		for (const { zh, en } of collisions) {
			for (const zone of zh) {
				expect(districtTranslations.get(zone)).toBe(en)
			}

			const reverse = districtTranslations.get(en) as ZhDistrict
			expect(zh).toContain(reverse)
		}
	})
})
