export class BaseLinqIterable {
    constructor(source) {
        this.source = source;
    }

    _getIterator(source) {
        return source[Symbol.iterator]();
    }

    get() {
        throw new Error('Not implemented');
    }
}
