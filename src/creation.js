export class SelectJsIterable {
    constructor(source) {
        this.source = source;
    }

    [Symbol.iterator]() {
        return this.source[Symbol.iterator]();
    }
}

export function toSelectIterable(source) {
    return new SelectJsIterable(source);
}
