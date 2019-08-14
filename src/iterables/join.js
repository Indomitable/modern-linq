import { BaseLinqIterable } from "../base-linq-iterable";
import { GroupIterable } from "./group";
import { SelectManyIterable } from "./select-many";
import { defaultElementSelector, doneValue, iteratorResultCreator } from "../utils";

export class JoinIterable extends BaseLinqIterable {
    /**
     * Creates join iterable
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

    [Symbol.iterator]() {
        const resultCreator = this.resultCreator;
        const outerIterator = this._getSourceIterator();
        const innerMap = GroupIterable.__group(this.joinIterable, this.joinIterableKeySelector, defaultElementSelector);
        const innerItemsExtractor = (outerItem) => {
            const key = this.sourceKeySelector(outerItem);
            return innerMap.get(key) || [];
        };
        let currentState = null;
        return {
            next() {
                const item = SelectManyIterable.__getNextItem(outerIterator, innerItemsExtractor, currentState);
                if (item.done) {
                    return doneValue();
                } else {
                    currentState = item.currentState;
                    return iteratorResultCreator(resultCreator(currentState.outerValue, item.innerValue));
                }
            }
        };
    }
}
