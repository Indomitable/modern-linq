import { BaseLinqIterable } from "../base-linq-iterable";
import { getIterator, doneValue, iteratorResultCreator } from "../utils";

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

    static __findNext(iterator, predicate) {
        let done = false;
        while (!done) {
            const next = iterator.next();
            if (!next.done && predicate(next.value)) {
                return iteratorResultCreator(next.value);
            }
            done = next.done;
        }
        return doneValue();
    }

    [Symbol.iterator]() {
        const iterator = this._getSourceIterator();
        const predicate = this.predicate;
        return {
            next() {
                return WhereIterable.__findNext(iterator, predicate);
            }
        };
    }
}

export class ArrayFilterIterable {
    constructor(array, predicate) {
        this.array = array;
        this.predicate = predicate;
    }

    [Symbol.iterator]() {
        const result = this.get();
        return getIterator(result);
    }

    get() {
        return this.array.filter(_ => this.predicate(_));
    }
}

export class WhereIterableFactory {
    static create(source, predicate) {
        const input = source.get();
        return Array.isArray(input) ? new ArrayFilterIterable(input, predicate) : new WhereIterable(source, predicate);
    }
}
