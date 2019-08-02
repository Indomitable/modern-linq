import { BaseLinqIterable } from "../base-linq-iterable";

/**
 * Return mapped array [1, 2, 3].select(x => x * 2) === [2, 4, 6]
 */
export class SelectIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} map
     */
    constructor(source, map) {
        super(source);
        this.map = map;
    }

    get() {
        if (Array.isArray(this.source)) {
            return this.source.map(this.map);
        }
        return this;
    }

    [Symbol.iterator]() {
        const iterator = this._getIterator(this.source);
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
