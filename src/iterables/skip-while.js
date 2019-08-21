/**
 * Return skip first elements until condition got falsy and return rest
 */
import { BaseLinqIterable } from "../base-linq-iterable";
import { doneValue, iteratorResultCreator } from "../utils";

export class SkipWhileIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {number} condition
     */
    constructor(source, condition) {
        super(source);
        this.condition = condition;
    }

    [Symbol.iterator]() {
        const iterator = this._getSourceIterator();
        const condition = this.condition;
        let isFirstElementReached = false;
        let index = -1;
        return {
            next() {
                const { done, value } = iterator.next();
                index++;
                if (done) {
                    return doneValue();
                }
                if (isFirstElementReached) {
                    return iteratorResultCreator(value);
                } else {
                    let next = { done: false, value: value };
                    while (!next.done && condition(next.value, index)) {
                        next = iterator.next();
                        index++;
                    }
                    if (next.done) {
                        return doneValue();
                    } else {
                        isFirstElementReached = true;
                        return iteratorResultCreator(next.value);
                    }
                }
            }
        };
    }
}
