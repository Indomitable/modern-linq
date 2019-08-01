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

export function fromIterable(source) {
    return new LinqIterable(source);
}

export function fromObject(obj) {
    return new LinqIterable(Object.entries(obj));
}

export function range(from, to) {
    return new RangeIterable(from, to);
}
