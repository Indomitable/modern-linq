import { BaseLinqIterable } from "../base-linq-iterable";
import { getIterator } from "../utils";

/**
 * Return flatten mapped array [[1, 2], [3, 4]].selectMany(x => x) === [1, 2, 3, 4, 5]
 */
export class SelectManyIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} extract
     */
    constructor(source, extract) {
        super(source);
        this.extract = extract;
    }

    get() {
        return this;
    }

    [Symbol.iterator]() {
        const source = this._getSource();
        const iterator = this._getIterator(source);
        const extract = this.extract;
        let currentState = null;
        return {
            next() {
                const item = SelectManyIterable.__getNextItem(iterator, extract, currentState);
                currentState = item.currentState;
                return item.value;
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
                return { value: { done: true } };
            }
            return {
                value: { done: false, value: firstInnerItem },
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
                value: { done: false, value: innerNext.value },
                currentState: {
                    innerIterator: currentState.innerIterator,
                    outerValue: currentState.outerValue
                }
            };
        }
    }
}



