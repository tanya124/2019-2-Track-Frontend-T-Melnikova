export interface IStat {
	Active: number;
	City: string;
	CityCode: string;
	Confirmed: number;
	Country: string;
	CountryCode: string;
	Date: string;
	Deaths: number;
	Lat: string;
	Lon: string;
	Province: string;
	Recovered: number;
}

export async function getStats(country: string): Promise<Array<IStat>> {
	return fetch(`https://api.covid19api.com/country/${country}?from=2020-03-01T00:00:00Z&to=2020-05-06T00:00:00Z`)
	.then((response: any) => response.json())
	.then((data: Array<IStat>) => {
		console.log('fetch', data)
		return data;
	})
}