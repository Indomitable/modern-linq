/**
 * Return mapped array [1, 2, 3].select(x => x * 2) === [2, 4, 6]
 */
export class SelectIterable {
	/**
	 * 
	 * @param {Iterable} source 
	 * @param {Function} map 
	 */
    constructor(source, map) {
		this.source = source;
		this.map = map;
	}

	[Symbol.iterator]() {
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
