import { RangeIterable } from "./generators/range";

export class SelectJsIterable {
    constructor(source) {
        this.source = source;
    }

    [Symbol.iterator]() {
        return this.source[Symbol.iterator]();
    }
}

export function fromIterable(source) {
    return new SelectJsIterable(source);
}

export function fromObject(obj) {
    return new SelectJsIterable(Object.entries(obj));
}

export function range(from, to) {
    return new RangeIterable(from, to);
}
