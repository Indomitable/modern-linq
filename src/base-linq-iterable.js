export class BaseLinqIterable {
    constructor(source) {
        this.source = source;
    }

    _getIterator(source) {
        return source[Symbol.iterator]();
    }

    _getSource() {
        return this.source instanceof BaseLinqIterable ? this.source.get() : this.source;
    }

    get() {
        throw new Error('Not implemented');
    }
}


export class NativeProcessingLinqIterable extends BaseLinqIterable {
    constructor(source) {
        super(source);
    }

    _nativeTake(array) {
        throw new Error('Not implemented');
    }

    _tryNativeProcess() {
        const source = this._getSource();
        if (Array.isArray(source)) {
            return { processed: this._nativeTake(source) };
        }
        return { source };
    }

    get() {
        const { processed } = this._tryNativeProcess();
        if (processed) {
            return processed;
        }
        return this;
    }

    
}
