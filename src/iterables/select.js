import { BaseLinqIterable } from "../base-linq-iterable";

/**
 * Return mapped array [1, 2, 3].select(x => x * 2) === [2, 4, 6]
 */
export class SelectIterable extends BaseLinqIterable {
	/**
	 * 
	 * @param {Iterable} source 
	 * @param {Function} map 
	 */
    constructor(source, map) {
		super();
		if (Array.isArray(source)) {
			this.isResulted = true;
			this.result = source.map(map);
		}
		this.source = source;
		this.map = map;
	}

	[Symbol.iterator]() {
		if (this.isResulted) {
			return this._getResultIterator();
		}
		const iterator = this.source[Symbol.iterator]();
		const map = this.map;
		return {
			next() {
				const { done, value } = iterator.next();
				if (done) {
					return {
						done: true
					};
				}
				return {
					done: false,
					value: map(value)
				};
			}
		};
    }
}
