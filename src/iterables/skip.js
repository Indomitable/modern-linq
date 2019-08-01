/**
 * Skip first N numbers of source and return the rest
 */
export class SkipIterable {
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
        let skipped = 0;
		return {
			next() {
                if (skipped == 0) {
                    // first get. 
                    while (skipped < count) {
                        const { done } = iterator.next();
                        skipped++;
                        if (done) {
                            return { done: true };
                        }
                    }
                }
                return iterator.next();
			}
		};
    }
}
