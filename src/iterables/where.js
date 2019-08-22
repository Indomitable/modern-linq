import { NativeProcessingLinqIterable } from "../base-linq-iterable";
import { doneValue, iteratorResultCreator } from "../utils";

/**
 * Return filtred array [1, 2, 3, 4].where(x => x % 2 === 0) === [2, 4]
 */
export class WhereIterable extends NativeProcessingLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} predicate
     */
    constructor(source, predicate) {
        super(source);
        this.predicate = predicate;
    }

    _nativeTake(array) {
        return array.filter(this.predicate);
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
        const { processed, source } = this._tryNativeProcess();
        if (processed) {
            return this._getIterator(processed);
        }
        const iterator = this._getIterator(source);
        const predicate = this.predicate;
        return {
            next() {
                return WhereIterable.__findNext(iterator, predicate);
            }
        };
    }
}
