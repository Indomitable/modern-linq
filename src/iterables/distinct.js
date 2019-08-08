import { BaseLinqIterable } from "../base-linq-iterable";

/**
 * Returns distinct values
 */
export class DistinctIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} comparer comparer function. if not provider use native Set.
     */
    constructor(source, comparer) {
        super(source);
        this.comparer = comparer;
    }

    get() {
        if (!this.comparer) {
            return new Set(this._getSource());
        }
        return this;
    }

    [Symbol.iterator]() {
        const source = this._getSource();
        if (!this.comparer) {
            const set = new Set(source);
            return this._getIterator(set);
        }
        const iterator = this._getIterator(source);
        const itemChecker = new DistinctItemChecker(this.comparer);
        return {
            next() {
                while (true) {
                    const { done, value } = iterator.next();
                    if (done) {
                        itemChecker.clear();
                        return { done: true };
                    }
                    if (itemChecker.has(value)) {
                        continue;
                    }
                    itemChecker.add(value);
                    return { done: false, value };
                }
            }
        };
    }
}

class DistinctItemChecker {
    constructor(comparer) {
        this.comparer = comparer;
        this.list = [];
    }

    add(item) {
        this.list.push(item);
    }

    has(item) {
        return this.list.some(_ => this.comparer(_, item));
    }

    clear() {
        this.list.length = 0;
    }
}
