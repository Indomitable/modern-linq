/**
 * Return skip last N elements from sequence
 */
import { BaseLinqIterable } from "../base-linq-iterable";
import { doneValue, iteratorResultCreator } from "../utils";

export class SkipLastIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {number} condition
     */
    constructor(source, count) {
        super(source);
        this.count = count <= 0 ? 0 : count;
    }

    [Symbol.iterator]() {
        const iterator = this._getSourceIterator();
        const count = this.count;
        const keep = [];
        let next = { done: false };
        return {
            next() {
                while (!next.done && keep.length <= count) {
                    next = iterator.next();
                    if (!next.done) {
                        keep.push(next.value);
                    }
                }
                if (next.done) {
                    return doneValue();
                }
                return iteratorResultCreator(keep.shift());
            }
        };
    }
}
