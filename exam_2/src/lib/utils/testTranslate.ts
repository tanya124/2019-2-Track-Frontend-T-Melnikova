import TranslateUtils from './index'

async function test() {
	const data1 = await TranslateUtils.translate('Hello', 'en-ru');
	console.log(`Hello --> ${data1}`)

	const data2 = await TranslateUtils.translate('Hello', 'ru');
	console.log(`Hello --> ${data2}`)

	const data3 = await TranslateUtils.translate('Hello', 'ru');
	console.log(`Hello --> ${data2}`)

}

test()
