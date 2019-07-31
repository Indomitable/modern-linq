/**
 * Return filtred array [1, 2, 3, 4].where(x => x % 2 === 0) === [2, 4]
 */
export class WhereIterable {
	/**
	 * 
	 * @param {Iterable} source 
	 * @param {Function} predicate 
	 */
    constructor(source, predicate) {
		this.source = source;
		this.predicate = predicate;
	}

	[Symbol.iterator]() {
		const iterator = this.source[Symbol.iterator]();
		const predicate = this.predicate;
		return {
			next() {
				while (true) {
					const { done, value } = iterator.next();
					if (done) {
						return {
							done: true
						};
					}
					if (predicate(value)) {
						return {
							done: false,
							value
						};
					}
				}
			}
		};
    }
}
