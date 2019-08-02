import { BaseLinqIterable } from "../base-linq-iterable";

/**
 * Return filtred array [1, 2, 3, 4].where(x => x % 2 === 0) === [2, 4]
 */
export class WhereIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} predicate
     */
    constructor(source, predicate) {
        super(source);
        this.predicate = predicate;
    }

    get() {
        if (Array.isArray(this.source)) {
            return this.source.filter(this.predicate);
        }
        return this;
    }

    [Symbol.iterator]() {
        const iterator = this._getIterator(this.source);
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
