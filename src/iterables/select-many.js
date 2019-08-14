import { BaseLinqIterable } from "../base-linq-iterable";
import { getIterator, doneValue, iteratorResultCreator } from "../utils";

/**
 * Return flatten mapped array [[1, 2], [3, 4]].selectMany(x => x) === [1, 2, 3, 4, 5]
 */
export class SelectManyIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} extract
     */
    constructor(source, innerSelector, resultCreator) {
        super(source);
        this.innerSelector = innerSelector;
        this.resultCreator = typeof resultCreator === 'undefined' ? SelectManyIterable.__defaultResultCreator : resultCreator;
    }

    static __defaultResultCreator(outer, inner) {
        return inner;
    }

    [Symbol.iterator]() {
        const source = this._getSource();
        const iterator = this._getIterator(source);
        const innerSelector = this.innerSelector;
        const resultCreator = this.resultCreator;
        let currentState = null;        
        return {
            next() {
                const item = SelectManyIterable.__getNextItem(iterator, innerSelector, currentState);
                if (item.done) {
                    return doneValue();
                } else {
                    currentState = item.currentState;
                    return iteratorResultCreator(resultCreator(currentState.outerValue, item.innerValue));
                }
            }
        };
    }

    static __getInnerIterator(outerIterator, extract) {
        const outerItem = outerIterator.next();
        if (outerItem.done) {
            return {
                final: true
            };
        }
        const innerIterator = getIterator(extract(outerItem.value));
        const innerItem = innerIterator.next();
        if (innerItem.done) {
            return SelectManyIterable.__getInnerIterator(outerIterator, extract);
        }
        return {
            current: {
                outerValue: outerItem.value,
                innerIterator: innerIterator,
            },
            firstInnerItem: innerItem.value,
            final: false
        };
    }

    static __getNextItem(mainIterator, extract, currentState) {
        if (!currentState) {
            const { current, firstInnerItem, final } = SelectManyIterable.__getInnerIterator(mainIterator, extract);
            if (final) {
                return { done: true };
            }
            return {
                innerValue: firstInnerItem,
                currentState: {
                    innerIterator: current.innerIterator,
                    outerValue: current.outerValue
                }
            };
        } else {
            const innerNext = currentState.innerIterator.next();
            if (innerNext.done) {
                return SelectManyIterable.__getNextItem(mainIterator, extract, null);
            }
            return {
                innerValue: innerNext.value,
                currentState: {
                    innerIterator: currentState.innerIterator,
                    outerValue: currentState.outerValue
                }
            };
        }
    }
}



