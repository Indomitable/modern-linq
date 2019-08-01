import { RangeIterable } from "./generators/range";

export class LinqIterable {
    constructor(source) {
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
