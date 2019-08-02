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
        super();
        if (Array.isArray(source)) {
            this.isResulted = true;
            this.result = source.filter(predicate);
        }
        this.source = source;
        this.predicate = predicate;
    }

    [Symbol.iterator]() {
        if (this.isResulted) {
            return this._getResultIterator();
        }
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
