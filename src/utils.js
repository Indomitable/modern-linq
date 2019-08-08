/**
 * Apply mixin to a class
 * @param {object} mixin
 * @param {Function[]} destinations
 */
export function applyMixin(mixin, destinations) {
    for (const dest of destinations) {
        Object.assign(dest.prototype, mixin);
    }
}

export function getIterator(iterable) {
    return iterable[Symbol.iterator]();
}

function __quickSort(items, left, right, comparer) {
    do {
        let i = left;
        let j = right;
        let x = items[i + ((j - i) >> 1)];
        do {
            while (i < items.length && comparer(x, items[i]) > 0) i++;
            while (j >= 0 && comparer(x, items[j]) < 0) j--;
            if (i > j) break;
            if (i < j) {

                let temp = items[i];
                items[i] = items[j];
                items[j] = temp;
            }
            i++;
            j--;
        } while (i <= j);
        if (j - left <= right - i) {
            if (left < j) __quickSort(items, left, j, comparer);
            left = i;
        } else {
            if (i < right) __quickSort(items, i, right, comparer);
            right = j;
        }
    } while (left < right);
}

export function quickSort(items, left, right, comparer) {
    const copy = [ ...items ]; // copy items.
    __quickSort(copy, left, right, comparer);
    return copy;
}

export class SetCheck {
    constructor() {
        this.set = new Set();
    }

    tryAdd(item) {
        const prevSize = this.set.size;
        this.set.add(item);
        return this.set.size > prevSize;
    }

    clear() {
        this.set.clear();
    }
}
