import {BaseLinqIterable} from "../base-linq-iterable";
import {quickSort} from "../utils";

export class OrderIterable extends BaseLinqIterable {
    constructor(source, keySelector, direction, comparer) {
        super(source);
        this.keySelector = keySelector;
        this.direction = direction;
        this.comparer = comparer;
    }

    static __sort(source, comparer) {
        const iterable = Array.isArray(source) ? source : source.toArray();
        return quickSort(source, 0, iterable.length - 1, comparer);
    }

    get() {
        return this;
    }

    [Symbol.iterator]() {
        const source = this._getSource();
        const keyComparer = typeof this.comparer === 'undefined' ? (a, b) => a - b  :  this.comparer;
        const comparer = (left, right) => {
            return this.direction * keyComparer(this.keySelector(left), this.keySelector(right));
        };
        const result = OrderIterable.__sort(source, comparer);
        return this._getIterator(result);
    }
}

