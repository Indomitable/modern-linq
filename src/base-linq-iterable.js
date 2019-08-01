export class BaseLinqIterable {
    constructor() {
        this.isResulted = false;
        this.result = null;
    }

    _getResultIterator() {
        return this.result[Symbol.iterator]();
    }
}
