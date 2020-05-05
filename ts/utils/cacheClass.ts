interface ICache {
	[index: string] : string
}

export class Cache {
	constructor() {
		this.cache_ = {}
	}

	setCache(key: string, value: string) {
		this.cache_[key] = value;
	}

	tryGetCache(key: string): string | null {
		try {
			return this.cache_[key];
		}
		catch(e) {
			return null;
		}
	}

	clear() {
		this.cache_ = {};
	}

	private cache_: ICache;
}