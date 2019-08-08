import { RangeIterable } from "./generators/range";
import { BaseLinqIterable } from "./base-linq-iterable";

export class LinqIterable extends BaseLinqIterable {
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

export class ArrayLikeIterable extends BaseLinqIterable {
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

export class ObjectIterable extends BaseLinqIterable {
    constructor(source) {
        super(source);
    }

    get() {
        return this;
    }

    [Symbol.iterator]() {
        const obj = this.source;
        const keys = Object.keys(obj);
        let index = 0;
        return {
            next() {
                if (index < keys.length) {
                    const key = keys[index];
                    const value = obj[key];
                    index++;
                    return { done: false, value: { key, value } };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

export function fromIterable(source) {
    return new LinqIterable(source);
}

export function fromObject(obj) {
    return new ObjectIterable(obj);
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
