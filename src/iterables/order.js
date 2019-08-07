import { BaseLinqIterable } from "../base-linq-iterable";
import { quickSort } from "../utils";

export class OrderIterable extends BaseLinqIterable {
    constructor(source, keySelector, direction, comparer) {
        super(source);
        this.keySelector = keySelector;
        this.direction = direction;
        this.comparer = comparer;
    }

    static __sort(source, comparer) {
        const arr = Array.isArray(source) ? source : Array.from(source);
        return quickSort(source, 0, arr.length - 1, comparer);
    }

    get() {
        return this;
    }

    [Symbol.iterator]() {
        const source = this._getSource();
        const keyComparer = typeof this.comparer === 'undefined' ? ((a, b) => a < b ? -1 : (a > b ? 1 : 0)) : this.comparer;
        const comparer = (left, right) => {
            return this.direction * keyComparer(this.keySelector(left), this.keySelector(right));
        };
        const result = OrderIterable.__sort(source, comparer);
        return this._getIterator(result);
    }
}

