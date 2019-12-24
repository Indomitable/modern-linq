import { getIterator, doneValue, iteratorResultCreator } from "../utils";
import {ToArrayArrayFinalizer} from "../finalizers/to-array";

/**
 * Return filtred array [1, 2, 3, 4].where(x => x % 2 === 0) === [2, 4]
 */
export class WhereIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} predicate
     */
    constructor(source, predicate) {
        this.source = source;
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
        const iterator = getIterator(this.source.get());
        const predicate = this.predicate;
        return {
            next() {
                return WhereIterable.__findNext(iterator, predicate);
            }
        };
    }

    get() {
        return this;
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

    toArray(mapper) {
        return ToArrayArrayFinalizer.get(this, mapper);
    }
}

export class WhereIterableFactory {
    static create(source, predicate) {
        const input = source.get();
        return Array.isArray(input) ? new ArrayFilterIterable(input, predicate) : new WhereIterable(input, predicate);
    }
}
