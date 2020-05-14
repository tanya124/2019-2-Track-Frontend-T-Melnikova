import { Cache } from './cacheClass';
import { IResponse, IResponseError } from './types';
const fetch = require('node-fetch');

let API_KEY: string;
if (process.env.API_KEY) {
	API_KEY = process.env.API_KEY
} else {
	API_KEY = require('./private.ts').API_KEY;
}

const API = 'https://translate.yandex.net/api/v1.5/tr.json/translate';

let cache = new Cache();

async function make_request(lang: string, text: string) : Promise<string> {
	return fetch(`${API}?key=${API_KEY}&lang=${lang}&text=${text}`, { method: 'POST' })
	.then((response: Response) => response.json())
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
	const value: null | string = cache.tryGetCache(`${ text }::::${ lang }`)
	if (value) {
		console.log('from cache');
		return value;
	}
	let translateText = await make_request(lang, text)
	return translateText;
};
