import { BaseLinqIterable } from "../base-linq-iterable";

/**
 * Skip first N numbers of source and return the rest
 */
export class SkipIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {number} count
     */
    constructor(source, count) {
        super(source);
        this.count = count;
    }

    get() {
        if (Array.isArray(this.source)) {
            return this.source.slice(this.count, this.source.length);
        }
        return this;
    }

    [Symbol.iterator]() {
        const iterator = this._getIterator(this.source);
        const count = this.count;
        let skipped = 0;
        return {
            next() {
                if (skipped === 0) {
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
