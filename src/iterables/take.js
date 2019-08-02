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
        super(source);
        this.count = count;
    }

    get() {
        if (Array.isArray(this.source)) {
            return this.source.slice(0, this.count);
        }
        return this;
    }

    [Symbol.iterator]() {
        const iterator = this._getIterator(this.source);
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
