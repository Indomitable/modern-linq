import { NativeProcessingLinqIterable } from "../base-linq-iterable";
import { quickSort } from "../utils";

export class OrderIterable extends NativeProcessingLinqIterable {
    constructor(source, keySelector, comparer) {
        super(source);
        this.keySelector = keySelector;
        this.comparer = comparer;
    }

    _nativeTake(array) {
        const comparer = this._getComparer();
        return [...array].sort(comparer);
    }

    _getComparer() {
        return typeof this.comparer === 'undefined' ? (a, b) => a < b ? -1 : (a > b ? 1 : 0) : this.comparer;
    }

    __sort(source) {
        const comparer = this._getComparer();
        const arr = Array.from(source);
        return quickSort(source, 0, arr.length - 1, comparer);
    }

    get() {
        const { processed, source } = this._tryNativeProcess();
        if (processed) {
            return processed;
        }
        return this.__sort(source);;
    }

    [Symbol.iterator]() {
        const sortedArray = this.get();
        return this._getIterator(sortedArray);
    }
}

export class OrderIterableDescending extends OrderIterable {
    _getComparer() {
        const comparer = super._getComparer();
        return (left, right) => {
            return 0 - comparer(this.keySelector(left), this.keySelector(right));
        };
    }
}
