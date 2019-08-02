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
        super();
        if (Array.isArray(source)) {
            this.isResulted = true;
            this.result = source.slice(count, source.length);
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
