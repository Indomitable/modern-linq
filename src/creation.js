import { RangeIterable } from "./generators/range";
import { BaseLinqIterable } from "./base-linq-iterable";

export class LinqIterable extends BaseLinqIterable {
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

export class ArrayLikeIterable extends BaseLinqIterable {
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

export function fromIterable(source) {
    return new LinqIterable(source);
}

export function fromObject(obj) {
    return new LinqIterable(Object.entries(obj));
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
