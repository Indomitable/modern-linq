/**
 * Return first N numbers of source
 */
export class TakeIterable {
	/**
	 * 
	 * @param {Iterable} source 
	 * @param {number} count 
	 */
    constructor(source, count) {
		this.source = source;
		this.count = count;
	}

	[Symbol.iterator]() {
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
