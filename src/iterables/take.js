import { BaseLinqIterable } from "../base-linq-iterable";

/**
 * Return first N numbers of source
 */
export class TakeIterable extends BaseLinqIterable {
	/**
	 * 
	 * @param {Iterable} source 
	 * @param {number} count 
	 */
    constructor(source, count) {
		super();
		if (Array.isArray(source)) {
			this.isResulted = true;
			this.result = source.slice(0, count);
		}
		this.source = source;
		this.count = count;
	}

	[Symbol.iterator]() {
		if (this.isResulted) {
			return this._getResultIterator();
		}
		const iterator = this.source[Symbol.iterator]();
        const count = this.count;
        let fetched = 0;
		return {
			next() {
                if (fetched < count) {
                    const { done, value } = iterator.next();
                    fetched++; 
                    if (done) {
                        return { done: true };
                    }
                    return { done: false, value };
                }
                return { done: true };
			}
		};
    }
}
