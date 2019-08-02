'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Apply mixin to a class
 * @param {object} mixin
 * @param {Function[]} destinations
 */
function applyMixin(mixin, destinations) {
    for (const dest of destinations) {
        Object.assign(dest.prototype, mixin);
    }
}

function getIterator(iterable) {
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

function quickSort(items, left, right, comparer) {
    const copy = [ ...items ]; // copy items.
    __quickSort(copy, left, right, comparer);
    return copy;
}

class BaseLinqIterable {
    constructor(source) {
        this.source = source;
    }

    _getIterator(source) {
        return source[Symbol.iterator]();
    }

    _getSource() {
        return this.source.get();
    }

    get() {
        throw new Error('Not implemented');
    }
}


class NativeProcessingLinqIterable extends BaseLinqIterable {
    constructor(source) {
        super(source);
    }

    _nativeTake(array) {
        throw new Error('Not implemented');
    }

    _tryNativeProcess() {
        const source = this._getSource();
        if (Array.isArray(source)) {
            return { processed: this._nativeTake(source) };
        }
        return { source };
    }

    get() {
        const { processed } = this._tryNativeProcess();
        if (processed) {
            return processed;
        }
        return this;
    }

    
}

/**
 * Generates range of numbers [from, to)
 */

class RangeIterable extends BaseLinqIterable {
    /**
     * The range is [from, to)
     * @param {number} from
     * @param {number} to
     */
    constructor(from, to) {
        super([]);
        this.from = from;
        this.to = to;
    }

    __ascendingRange() {
        const to = this.to;
        let current = this.from;
        return {
            next() {
                if (current < to) {
                    return { done: false, value: current++ };
                } else {
                    return { done: true };
                }
            }
        };
    }

    __descendingRange() {
        const to = this.to;
        let current = this.from;
        return {
            next() {
                if (current > to) {
                    return { done: false, value: current-- };
                } else {
                    return { done: true };
                }
            }
        };
    }

    get() {
        return this;
    }

    [Symbol.iterator]() {
        if (this.from < this.to) {
            return this.__ascendingRange();
        }
        if (this.from > this.to) {
            return this.__descendingRange();
        }
        return {
            next() {
                return { done: true }
            }
        };
    }
}

class LinqIterable extends BaseLinqIterable {
    constructor(source) {
        super(source);
    }

    get() {
        return this.source;
    }

    [Symbol.iterator]() {
        return this._getIterator(this.source);
    }
}

class ArrayLikeIterable extends BaseLinqIterable {
    constructor(source) {
        super(source);
    }

    get() {
        return Array.isArray(this.source) ? this.source : this;
    }

    [Symbol.iterator]() {
        if (Array.isArray(this.source)) {
            return this._getIterator(this.source);
        }
        const length = this.source.length;
        const source = this.source;
        let current = 0;
        return {
            next() {
                if (current < length) {
                    const value = source[current];
                    current++;
                    return { done: false, value };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

function fromIterable(source) {
    return new LinqIterable(source);
}

function fromObject(obj) {
    return new LinqIterable(Object.entries(obj));
}

/**
 * The object which has property length of type number and keys with names: '0', '1' ...
 * @param {ArrayLike} source
 */
function fromArrayLike(source) {
    return new ArrayLikeIterable(source);
}

function range(from, to) {
    return new RangeIterable(from, to);
}

/**
 * Return filtred array [1, 2, 3, 4].where(x => x % 2 === 0) === [2, 4]
 */
class WhereIterable extends NativeProcessingLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} predicate
     */
    constructor(source, predicate) {
        super(source);
        this.predicate = predicate;
    }

    _nativeTake(array) {
        return array.filter(this.predicate);
    }

    [Symbol.iterator]() {
        const { processed, source } = this._tryNativeProcess();
        if (processed) {
            return this._getIterator(processed);
        }
        const iterator = this._getIterator(source);
        const predicate = this.predicate;
        return {
            next() {
                while (true) {
                    const { done, value } = iterator.next();
                    if (done) {
                        return {
                            done: true
                        };
                    }
                    if (predicate(value)) {
                        return {
                            done: false,
                            value
                        };
                    }
                }
            }
        };
    }
}

/**
 * Return mapped array [1, 2, 3].select(x => x * 2) === [2, 4, 6]
 */
class SelectIterable extends NativeProcessingLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} map
     */
    constructor(source, map) {
        super(source);
        this.map = map;
    }

    _nativeTake(array) {
        return array.map(this.map);
    }

    [Symbol.iterator]() {
        const { processed, source } = this._tryNativeProcess();
        if (processed) {
            return this._getIterator(processed);
        }
        const iterator = this._getIterator(source);
        const map = this.map;
        return {
            next() {
                const { done, value } = iterator.next();
                if (done) {
                    return {
                        done: true
                    };
                }
                return {
                    done: false,
                    value: map(value)
                };
            }
        };
    }
}

/**
 * Return flatten mapped array [[1, 2], [3, 4]].selectMany(x => x) === [1, 2, 3, 4, 5]
 */
class SelectManyIterable extends BaseLinqIterable {
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
        let isSubDone = true;
        let subIterator = null;
        return {
            next() {
                const item = SelectManyIterable.getNextItem(iterator, extract, subIterator, isSubDone);
                isSubDone = item.sdone;
                subIterator = item.sIterator;
                return item.value;
            }
        };
    }

    static getSecondaryIterator(mainIterator, extract) {
        const mainItem = mainIterator.next();
        if (mainItem.done) {
            return {
                final: true
            };
        }
        const secondaryIterator = extract(mainItem.value)[Symbol.iterator]();
        const secondaryItem = secondaryIterator.next();
        if (secondaryItem.done) {
            return SelectManyIterable.getSecondaryIterator(mainIterator, extract);
        }
        return { iterator: secondaryIterator, first: secondaryItem.value, final: false };
    }

    static getNextItem(mainIterator, extract, subIterator, isSubDone) {
        if (isSubDone) {
            const { iterator, first, final } = SelectManyIterable.getSecondaryIterator(mainIterator, extract);
            if (final) {
                return { value: { done: true } };
            }
            return { value: { done: false, value: first }, sIterator: iterator, sdone: false };
        } else {
            const snext = subIterator.next();
            if (snext.done) {
                return SelectManyIterable.getNextItem(mainIterator, extract, null, true);
            }
            return { value: { done: false, value: snext.value }, sIterator: subIterator, sdone: false };
        }
    }

}

class FirstFinalizer {
    static get(source, predicate) {
        const iterable = source.get();
        if (predicate) {
            if (Array.isArray(iterable)) {
                return iterable.find(predicate);
            } else {
                return iterable.where(predicate).first();
            }
        }
        const iterator = getIterator(iterable);
        const { value } = iterator.next();
        return value;
    }

    static getOrDefault(source, def, predicate) {
        const iterable = source.get();
        if (predicate) {
            for (const item of iterable) {
                if (predicate(item)) {
                    return item;
                }
            }
            return def;
        } else {
            const iterator = getIterator(iterable);
            const {value, done} = iterator.next();
            return done ? def : value;
        }
    }

    static getOrThrow(source) {
        const iterator = getIterator(source.get());
        const { value, done } = iterator.next();
        if (done) {
            throw new TypeError('Sequence contains no items');
        }
        return value;
    }
}

class SingleFinalizer {
    static get(source, predicate) {
        const iterable = source.get();
        let result;
        let count = 0;
        for (const item of iterable) {
            if ((predicate && predicate(item)) || !predicate) {
               result = item;
               count++;
            }
            if (count > 1) {
                throw new TypeError('Sequence contains multiple items');
            }
        }
        if (count === 0) {
            throw new TypeError('Sequence contains no items');
        }
        return result;
    }

    static getOrDefault(source, def, predicate) {
        const iterable = source.get();
        let result;
        let count = 0;
        for (const item of iterable) {
            if ((predicate && predicate(item)) || !predicate) {
                result = item;
                count++;
            }
            if (count > 1) {
                throw new TypeError('Sequence contains multiple items');
            }
        }
        if (count === 0) {
            return def;
        }
        return result;
    }
}

/**
 * Return first N numbers of source
 */
class TakeIterable extends NativeProcessingLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {number} count
     */
    constructor(source, count) {
        super(source);
        this.count = count;
    }

    _nativeTake(array) {
        return array.slice(0, this.count);
    }

    [Symbol.iterator]() {
        const { processed, source } = this._tryNativeProcess();
        if (processed) {
            return this._getIterator(processed);
        }
        const iterator = this._getIterator(source);
        const count = this.count;
        let fetched = 0;
        return {
            next() {
                if (fetched < count) {
                    const { done, value } = iterator.next();
                    fetched++;
                    if (done) {
                        return { done: true };
                    }
                    return { done: false, value };
                }
                return { done: true };
            }
        };
    }
}

/**
 * Skip first N numbers of source and return the rest
 */
class SkipIterable extends NativeProcessingLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {number} count
     */
    constructor(source, count) {
        super(source);
        this.count = count;
    }

    _nativeTake(array) {
        return array.slice(this.count, array.length);
    }

    [Symbol.iterator]() {
        const { processed, source } = this._tryNativeProcess();
        if (processed) {
            return this._getIterator(processed);
        }
        const iterator = this._getIterator(source);
        const count = this.count;
        let skipped = 0;
        return {
            next() {
                if (skipped === 0) {
                    // first get. 
                    while (skipped < count) {
                        const { done } = iterator.next();
                        skipped++;
                        if (done) {
                            return { done: true };
                        }
                    }
                }
                return iterator.next();
            }
        };
    }
}

class AllFinalizer {
    static get(source, predicate) {
        if (Array.isArray(source)) {
            return source.every(predicate);
        }
        for (const item of source) {
            if (!predicate(item)) {
                return false;
            }
        }
        return true;
    }

    static getAllAndEvery(source, predicate) {
        if (Array.isArray(source)) {
            return source.length > 0 && source.every(predicate);
        }
        let hasItems = false;
        for (const item of source) {
            hasItems = true;
            if (!predicate(item)) {
                return false;
            }
        }
        return hasItems;
    }
}

class AnyFinalizer {
    static get(source, predicate) {
        if (Array.isArray(source)) {
            return source.some(predicate);
        }
        for (const item of source) {
            if (predicate(item)) {
                return true;
            }
        }
        return false;
    }
}

/**
 * Returns distinct values
 */
class DistinctIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} comparer comparer function. if not provider use native Set.
     */
    constructor(source, comparer) {
        super(source);
        this.comparer = comparer;
    }

    get() {
        if (!this.comparer) {
            return new Set(this._getSource());
        }
        return this;
    }

    [Symbol.iterator]() {
        const source = this._getSource();
        if (!this.comparer) {
            const set = new Set(source);
            return this._getIterator(set);
        }
        const iterator = this._getIterator(source);
        const itemChecker = new DistinctItemChecker(this.comparer);
        return {
            next() {
                while (true) {
                    const { done, value } = iterator.next();
                    if (done) {
                        return { done: true };
                    }
                    if (itemChecker.has(value)) {
                        continue;
                    }
                    itemChecker.add(value);
                    return { done: false, value };
                }
            }
        };
    }
}

class DistinctItemChecker {
    constructor(comparer) {
        this.comparer = comparer;
        this.list = [];
    }

    add(item) {
        this.list.push(item);
    }

    has(item) {
        return this.list.some(_ => this.comparer(_, item));
    }
}

class Grouping extends BaseLinqIterable {
    constructor(key, source) {
        super(source.toArray());
        this.key = key;
    }

    get() {
        return this.source;
    }

    [Symbol.iterator]() {
        return this._getIterator(this.source);
    }
}

class GroupIterable extends BaseLinqIterable {
    constructor(source, keySelector, elementSelector, resultCreator) {
        super(source);
        if (typeof keySelector === 'undefined') {
            throw new Error('keyselector is required');
        }
        this.keySelector = keySelector;
        if (typeof elementSelector === 'function' && elementSelector.length === 2) {
            this.resultCreator = elementSelector;
        } else {
            this.elementSelector = elementSelector;
            this.resultCreator = resultCreator;
        }
    }

    __group(source) {
        const map = new Map();
        const elementSelector = typeof this.elementSelector === 'undefined' ? _ => _ : this.elementSelector;
        for (const item of source) {
            const key = this.keySelector(item);
            const element = elementSelector(item);
            let value = map.get(key);
            if (typeof value === 'undefined') {
                value = [ element ];
            } else {
                value.push(element);
            }
            map.set(key, value);
        }
        return map;
    }

    get() {
        return this;
    }

    [Symbol.iterator]() {
        const source = this._getSource();
        const result = this.__group(source);
        const groupIterator = this._getIterator(result);
        const resultCreator = typeof this.resultCreator === 'undefined' ? (key, grouping) => (new Grouping(key, grouping)) : this.resultCreator;
        return {
            next() {
                const { done, value } = groupIterator.next();
                if (done) {
                    return { done: true };
                }
                const [ key, grouping ] = value;
                const linqGrouping = fromIterable(grouping);
                const result = resultCreator(key, linqGrouping);
                return {
                    done: false,
                    value: result
                };
            }
        }
    }
}

class CountFinalizer {
    static get(source, predicate) {
        if (Array.isArray(source)) {
            if (predicate) {
                return source.filter(predicate).length;
            }
            return source.length;
        }
        let i = 0;
        const iterator = source[Symbol.iterator]();
        while (true) {
            let { done, value } = iterator.next();
            if (done) {
                return i;
            } else {
                if (predicate) {
                    if (predicate(value)) {
                        i++;
                    }
                } else {
                    i++;
                }
            }
        }
    }
}

class AggregateFinalizer {
    static get(source, accumulator) {
        if (Array.isArray(source)) {
            return source.reduce(accumulator);
        }
        let res;
        let index = -1;
        for (const item of source) {
            if (index === -1) {
                res = item;
                index = 0;
            } else {
                index++;
                res = accumulator(res, item, index);
            }
        }
        if (index === -1) {
            throw new TypeError('No items in sequence');
        }
        return res;
    }

    static getWithInitial(source, accumulator, initial) {
        if (Array.isArray(source)) {
            return source.reduce(accumulator, initial);
        }
        let res = initial;
        let index = 0;
        for (const item of source) {
            index++;
            res = accumulator(res, item, index);
        }
        return res;
    }
}

class OrderIterable extends BaseLinqIterable {
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

const linqMixin = {
    where(predicate) {
        return new WhereIterable(this, predicate);
    },
    select(map) {
        return new SelectIterable(this, map);
    },
    selectMany(map) {
        return new SelectManyIterable(this, map);
    },
    take(count) {
        return new TakeIterable(this, count);
    },
    skip(count) {
        return new SkipIterable(this, count);
    },
    distinct(comparer) {
        return new DistinctIterable(this, comparer);
    },
    ofType(type) {
        if (typeof type === 'string') {
            return new WhereIterable(this, function (item) {
                return typeof item === type;
            });
        } else {
            return new WhereIterable(this, function (item) {
                return item instanceof type;
            });
        }
    },
    groupBy(keySelector, elementSelector, resultCreator) {
        return new GroupIterable(this, keySelector, elementSelector, resultCreator);
    },
    orderBy(keySelector, comparer) {
        return new OrderIterable(this, keySelector, 1, comparer);
    },
    orderByDescending(keySelector, comparer) {
        return new OrderIterable(this, keySelector, -1, comparer);
    },
    toArray() {
        const result = this.get();
        return Array.isArray(result) ? result : Array.from(result);
    },
    toMap(keySelector, valueSelector) {
        const transformValue = typeof valueSelector === 'undefined';
        return new Map(this.select(_ => [
                keySelector(_),
                transformValue ? _ : valueSelector(_)
            ])
        );
    },
    toSet() {
        return new Set(this.get());
    },
    first(predicate) {
        return FirstFinalizer.get(this, predicate);
    },
    firstOrDefault(def, predicate) {
        return FirstFinalizer.getOrDefault(this, def, predicate);
    },
    firstOrThrow() {
        return FirstFinalizer.getOrThrow(this);
    },
    single(predicate) {
        return SingleFinalizer.get(this, predicate);
    },
    singleOrDefault(def, predicate) {
        return SingleFinalizer.getOrDefault(this, def, predicate);
    },
    all(predicate) {
        return AllFinalizer.get(this.get(), predicate)
    },
    allAndEvery(predicate) {
        return AllFinalizer.getAllAndEvery(this.get(), predicate)
    },
    any(predicate) {
        return AnyFinalizer.get(this.get(), predicate)
    },
    count(predicate) {
        return CountFinalizer.get(this.get(), predicate);
    },
    aggregate(accumulator, initial) {
        switch (arguments.length) {
            case 1: {
                return AggregateFinalizer.get(this.get(), accumulator);
            }
            case 2: {
                // here the resultCreator actually is the initial
                return AggregateFinalizer.getWithInitial(this.get(), accumulator, initial);
            }
            default: {
                throw new RangeError('invalid arguments');
            }
        }
    },
    sum() {
        return AggregateFinalizer.get(this.get(), (r, i) => r + i);
    },
    product() {
        return AggregateFinalizer.get(this.get(), (r, i) => r * i);
    },
    min(comparer) {
        const compare = typeof comparer === 'undefined' ? (a, b) => a - b : comparer;
        return AggregateFinalizer.get(this.get(), (a, b) => {
            const comp = compare(a, b);
            return comp < 0 ? a : (comp > 0 ? b : a);
        });
    },
    max(comparer) {
        const compare = typeof comparer === 'undefined' ? (a, b) => a - b : comparer;
        return AggregateFinalizer.get(this.get(), (a, b) => {
            const comp = compare(a, b);
            return comp < 0 ? b : (comp > 0 ? a : b);
        });
    },
    join(separator) {
        return this.select(_ => '' + _).toArray().join(separator);
    }
};

applyMixin(linqMixin, [
    LinqIterable,
    ArrayLikeIterable,
    WhereIterable,
    SelectIterable,
    SelectManyIterable,
    TakeIterable,
    SkipIterable,
    RangeIterable,
    DistinctIterable,
    Grouping,
    GroupIterable,
    OrderIterable,
]);

exports.fromArrayLike = fromArrayLike;
exports.fromIterable = fromIterable;
exports.fromObject = fromObject;
exports.range = range;
