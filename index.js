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

/**
 * Generates range of numbers [from, to)
 */
class RangeIterable {
    /**
     * The range is [from, to)
     * @param {number} from
     * @param {number} to
     */
    constructor(from, to) {
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

class BaseLinqIterable {
    constructor() {
        this.isResulted = false;
        this.result = null;
    }

    _getResultIterator() {
        return this.result[Symbol.iterator]();
    }
}

class LinqIterable extends BaseLinqIterable {
    constructor(source) {
        super();
        if (Array.isArray(source)) {
            this.isResulted = true;
            this.result = source;
        }
        this.source = source;
    }

    [Symbol.iterator]() {
        return this.source[Symbol.iterator]();
    }
}

class ArrayLikeIterable extends BaseLinqIterable {
    constructor(source) {
        super();
        if (Array.isArray(source)) {
            this.isResulted = true;
            this.result = source;
        }
        this.source = source;
    }

    [Symbol.iterator]() {
        if (this.isResulted) {
            return this._getResultIterator();
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
class WhereIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} predicate
     */
    constructor(source, predicate) {
        super();
        if (Array.isArray(source)) {
            this.isResulted = true;
            this.result = source.filter(predicate);
        }
        this.source = source;
        this.predicate = predicate;
    }

    [Symbol.iterator]() {
        if (this.isResulted) {
            return this._getResultIterator();
        }
        const iterator = this.source[Symbol.iterator]();
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
class SelectIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} map
     */
    constructor(source, map) {
        super();
        if (Array.isArray(source)) {
            this.isResulted = true;
            this.result = source.map(map);
        }
        this.source = source;
        this.map = map;
    }

    [Symbol.iterator]() {
        if (this.isResulted) {
            return this._getResultIterator();
        }
        const iterator = this.source[Symbol.iterator]();
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
        super();
        this.source = source;
        this.extract = extract;
    }

    [Symbol.iterator]() {
        const iterator = this.source[Symbol.iterator]();
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
    static get(iterable) {
        const iterator = iterable[Symbol.iterator]();
        const { value } = iterator.next();
        return value;
    }

    static getOrDefault(iterable, def) {
        const iterator = iterable[Symbol.iterator]();
        const { value, done } = iterator.next();
        return done ? def : value;
    }

    static getOrThrow(iterable, def) {
        const iterator = iterable[Symbol.iterator]();
        const { value, done } = iterator.next();
        if (done) {
            throw new RangeError('Sequence contains no items');
        }
        return value;
    }
}

class SingleFinalizer {
    static get(iterable) {
        const iterator = iterable[Symbol.iterator]();
        const { value, done } = iterator.next();
        if (done || !iterator.next().done) {
            throw new RangeError('Sequence does not contain single item');
        }
        return value;
    }

    static getOrDefault(iterable, def) {
        const iterator = iterable[Symbol.iterator]();
        const { value, done } = iterator.next();
        if (!iterator.next().done) {
            throw new RangeError('Sequence contains multiple items');
        }
        return done ? def : value;
    }
}

/**
 * Return first N numbers of source
 */
class TakeIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {number} count
     */
    constructor(source, count) {
        super();
        if (Array.isArray(source)) {
            this.isResulted = true;
            this.result = source.slice(0, count);
        }
        this.source = source;
        this.count = count;
    }

    [Symbol.iterator]() {
        if (this.isResulted) {
            return this._getResultIterator();
        }
        const iterator = this.source[Symbol.iterator]();
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
class SkipIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {number} count
     */
    constructor(source, count) {
        super();
        if (Array.isArray(source)) {
            this.isResulted = true;
            this.result = source.slice(count, source.length);
        }
        this.source = source;
        this.count = count;
    }

    [Symbol.iterator]() {
        if (this.isResulted) {
            return this._getResultIterator();
        }
        const iterator = this.source[Symbol.iterator]();
        const count = this.count;
        let skipped = 0;
        return {
            next() {
                if (skipped == 0) {
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
        super();
        this.source = source;
        this.comparer = comparer;
    }

    [Symbol.iterator]() {
        if (!this.comparer) {
            var set = new Set(this.source);
            return set[Symbol.iterator]();
        }
        const iterator = this.source[Symbol.iterator]();
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
        super();
        this.key = key;
        this.source = source.toArray();
        this.isResulted = true;
        this.result = this.source;
    }

    [Symbol.iterator]() {
        const iterator = this._getResultIterator();
        return {
            next() {
                return iterator.next();
            }
        }
    }
}

class GroupIterable extends BaseLinqIterable {
    constructor(source, keySelector, elementSelector, resultCreator) {
        super();
        this.source = source;
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

    __group() {
        const map = new Map();
        const elementSelector = typeof this.elementSelector === 'undefined' ? _ => _ : this.elementSelector;
        for (const item of this.source) {
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

    [Symbol.iterator]() {
        const groupIterator = this.__group()[Symbol.iterator]();
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

const linqMixin = {
    where(predicate) {
        const source = this.isResulted ? this.result : this;
        return new WhereIterable(source, predicate);
    },
    select(map) {
        const source = this.isResulted ? this.result : this;
        return new SelectIterable(source, map);
    },
    selectMany(map) {
        return new SelectManyIterable(this, map);
    },
    take(count) {
        const source = this.isResulted ? this.result : this;
        return new TakeIterable(source, count);
    },
    skip(count) {
        const source = this.isResulted ? this.result : this;
        return new SkipIterable(source, count);
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
    toArray() {
        return this.isResulted ? this.result : Array.from(this);
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
        return new Set(this);
    },
    first() {
        return FirstFinalizer.get(this);
    },
    firstOrDefault(def) {
        return FirstFinalizer.getOrDefault(this, def);
    },
    firstOrThrow() {
        return FirstFinalizer.getOrThrow(this);
    },
    single() {
        return SingleFinalizer.get(this);
    },
    singleOrDefault(def) {
        return SingleFinalizer.getOrDefault(this, def);
    },
    all(predicate) {
        return AllFinalizer.get(this, predicate)
    },
    allAndEvery(predicate) {
        return AllFinalizer.getAllAndEvery(this, predicate)
    },
    any(predicate) {
        return AnyFinalizer.get(this, predicate)
    },
    count(predicate) {
        return CountFinalizer.get(this, predicate);
    },
    aggregate(accumulator, initial) {
        switch (arguments.length) {
            case 1: {
                return AggregateFinalizer.get(this, accumulator);
            }
            case 2: {
                // here the resultCreator actually is the initial
                return AggregateFinalizer.getWithInitial(this, accumulator, initial);
            }
            default: {
                throw new RangeError('invalid arguments');
            }
        }
    },
    sum() {
        return AggregateFinalizer.get(this, (r, i) => r + i);
    },
    product() {
        return AggregateFinalizer.get(this, (r, i) => r * i);
    },
    min(comparer) {
        const compare = typeof comparer === 'undefined' ? (a, b) => a - b : comparer;
        return AggregateFinalizer.get(this, (a, b) => {
            const comp = compare(a, b);
            return comp < 0 ? a : (comp > 0 ? b : a);
        });
    },
    max(comparer) {
        const compare = typeof comparer === 'undefined' ? (a, b) => a - b : comparer;
        return AggregateFinalizer.get(this, (a, b) => {
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
]);

exports.fromArrayLike = fromArrayLike;
exports.fromIterable = fromIterable;
exports.fromObject = fromObject;
exports.range = range;
