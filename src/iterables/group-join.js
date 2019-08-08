import { BaseLinqIterable } from "../base-linq-iterable";
import { GroupIterable } from "./group";

export class GroupJoinIterable extends BaseLinqIterable {
    /**
     * Creates group join iterable
     * @param {Iterable} source
     * @param {Iterable} joinIterable
     * @param {Function} sourceKeySelector
     * @param {Function} joinIterableKeySelector
     * @param {Function} resultCreator
     */
    constructor(source, joinIterable, sourceKeySelector, joinIterableKeySelector, resultCreator) {
        super(source);
        this.joinIterable = joinIterable;
        this.sourceKeySelector = sourceKeySelector;
        this.joinIterableKeySelector = joinIterableKeySelector;
        this.resultCreator = resultCreator;
    }

    get() {
        return this;
    }

    static __getNext(outerIterator, outerKeySelector, innerMap, resultSelector) {
        const { done, value } = outerIterator.next();
        if (done) {
            innerMap.clear();
            return { done: true };
        }
        const outerKey = outerKeySelector(value);
        const innerValue = innerMap.get(outerKey) || [];
        const resultValue = resultSelector(value, innerValue);
        return {
            done: false,
            value: resultValue
        };
    }

    [Symbol.iterator]() {
        const outerIterator = this._getIterator(this._getSource());
        const innerMap = GroupIterable.__group(this.joinIterable, this.joinIterableKeySelector);
        const outerKeySelector = this.sourceKeySelector;
        const resultCreator = this.resultCreator;
        return {
            next() {
                return GroupJoinIterable.__getNext(outerIterator, outerKeySelector, innerMap, resultCreator);
            }
        };
    }
}
