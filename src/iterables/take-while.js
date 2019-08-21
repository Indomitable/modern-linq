/**
 * Return items until certain condition got falsy
 */
import { BaseLinqIterable } from "../base-linq-iterable";
import { doneValue, iteratorResultCreator } from "../utils";

export class TakeWhileIterable extends BaseLinqIterable {
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
        let index = -1;
        return {
            next() {
                const { done, value } = iterator.next();
                index++;
                if (!done && condition(value, index)) {
                    return iteratorResultCreator(value)
                } else {
                    return doneValue()
                }
            }
        };
    }
}
