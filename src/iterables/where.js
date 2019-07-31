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
