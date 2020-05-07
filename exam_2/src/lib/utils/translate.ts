import { Cache } from './cacheClass';
import { IResponse, IResponseError } from './types'
const fetch = require('node-fetch');


const API_KEY = 'trnsl.1.1.20190503T141705Z.7e1cb280e23d6a08.185413112c5e3d0261abefb9c4b18b8bf9d8fdc8';
const API = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

let cache = new Cache();

async function make_request(lang: string, text: string) : Promise<string> {
	return fetch(`${API}?key=${API_KEY}&lang=${lang}&text=${text}`, { method: 'POST' })
	.then((response: any) => response.json())
	.then((data: IResponse) => {
		cache.setCache(`${ text }::::${ lang }`, data.text);
		return data.text;
	})
	.catch((error: IResponseError) => {
		cache.setCache(`${ text }::::${ lang }`, error.message);
		return error.message;
	});
}

export async function translate(text: string, lang: string): Promise<string> {
	const value: any = cache.tryGetCache(`${ text }::::${ lang }`)
	if (value) {
		console.log('from cache');
		return value;
	}
	let translateText = await make_request(lang, text)
	return translateText;
};
