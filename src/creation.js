import { RangeIterable } from "./generators/range";
import { BaseLinqIterable } from "./base-linq-iterable";
import { RepeatIterable } from "./generators/repeat";
import { getIterator, doneValue, iteratorResultCreator } from "./utils";

export class LinqIterable extends BaseLinqIterable {
    constructor(source) {
        super(source);
    }

    get() {
        return this.source;
    }

    [Symbol.iterator]() {
        return getIterator(this.source);
    }
}

export class ArrayLikeIterable extends BaseLinqIterable {
    constructor(source) {
        super(source);
    }

    get() {
        return Array.isArray(this.source) ? this.source : this;
    }

    [Symbol.iterator]() {
        if (Array.isArray(this.source)) {
            return getIterator(this.source);
        }
        const length = this.source.length;
        const source = this.source;
        let current = 0;
        return {
            next() {
                if (current < length) {
                    const value = source[current];
                    current++;
                    return iteratorResultCreator(value);
                } else {
                    return doneValue();
                }
            }
        };
    }
}

export class ObjectIterable extends BaseLinqIterable {
    constructor(source, resultCreator) {
        super(source);
        this.resultCreator = typeof resultCreator === 'undefined' ? ObjectIterable.__defaultResultCreator : resultCreator;
    }

    static __defaultResultCreator(key, value) {
        return { key, value };
    }

    [Symbol.iterator]() {
        const obj = this.source;
        const resultCreator = this.resultCreator;
        const keys = Object.keys(obj);
        let index = 0;
        return {
            next() {
                if (index < keys.length) {
                    const key = keys[index];
                    const value = obj[key];
                    index++;
                    return iteratorResultCreator(resultCreator(key, value));
                } else {
                    return doneValue();
                }
            }
        };
    }
}

export function fromIterable(source) {
    return new LinqIterable(source);
}

export function fromObject(obj, resultCreator) {
    return new ObjectIterable(obj, resultCreator);
}

/**
 * The object which has property length of type number and keys with names: '0', '1' ...
 * @param {ArrayLike} source
 */
export function fromArrayLike(source) {
    return new ArrayLikeIterable(source);
}

export function range(from, to) {
    return new RangeIterable(from, to);
}

export function repeat(value, times) {
    return new RepeatIterable(value, times);
}

export function from(source) {
    const iterator = source[Symbol.iterator];
    if (typeof iterator === 'function') {
        return fromIterable(source);
    }
    if ('length' in source) {
        return fromArrayLike(source);
    }
    return fromObject(source);
}
