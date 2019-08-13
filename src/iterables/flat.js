import { SelectManyIterable } from "./select-many";
import { doneValue } from "../utils";

/**
 * Subclass of Select many, but instead of returning just the sub items, it returns pair of outer and inner item.
 */
export class FlatIterable extends SelectManyIterable {
    constructor(source, collectionSelector) {
        super(source, collectionSelector);
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
                if (item.value.done) {
                    return doneValue();
                }
                return {
                    done: item.value.done,
                    value: {
                        outer: currentState.outerValue,
                        inner: item.value.value
                    }
                };
            }
        };
    }
}
