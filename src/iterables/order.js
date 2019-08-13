import { NativeProcessingLinqIterable } from "../base-linq-iterable";
import { defaultSortComparer, quickSort } from "../utils";

export class OrderIterable extends NativeProcessingLinqIterable {
    constructor(source, keySelector, comparer) {
        super(source);
        this.keySelector = keySelector;
        this.comparer = typeof comparer === 'undefined' ? defaultSortComparer : comparer;
    }

    _nativeTake(array) {
        const comparer = this._getComparer();
        return [...array].sort(comparer);
    }

    _getComparer() {
        return (left, right) => {
            return this.comparer(this.keySelector(left), this.keySelector(right));
        };
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
        return (left, right) => {
            return 0 - this.comparer(this.keySelector(left), this.keySelector(right));
        };
    }
}
