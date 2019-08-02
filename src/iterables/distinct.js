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
        super();
        this.source = source;
        this.comparer = comparer;
    }

    [Symbol.iterator]() {
        if (!this.comparer) {
            var set = new Set(this.source);
            return set[Symbol.iterator]();
        }
        const iterator = this.source[Symbol.iterator]();
        const itemChecker = new DistinctItemChecker(this.comparer);
        return {
            next() {
                while (true) {
                    const { done, value } = iterator.next();
                    if (done) {
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
}
