import {getIterator} from "../utils";

/**
 * Returns distinct values
 */
export class DistinctIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} comparer comparer function. if not provider use native Set.
     */
    constructor(source, comparer) {
        this.source = source;
        this.comparer = comparer;
    }

    [Symbol.iterator]() {
        const source = this.source.get();
        if (!this.comparer) {
            const set = new Set(source);
            return getIterator(set);
        }
        const iterator = getIterator(source);
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

    get() {
        return this;
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
