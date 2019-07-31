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
    if (Object.isObject(obj)) {
        return new SelectJsIterable(Object.entries(obj));
    }
    throw new Error('Invalid object');
}
