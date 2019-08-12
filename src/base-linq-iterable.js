import { getIterator } from "./utils";

export class BaseLinqIterable {
    constructor(source) {
        this.source = source;
    }

    _getIterator(source) {
        return getIterator(source);
    }

    _getSourceIterator() {
        return getIterator(this.source.get());
    }

    _getSource() {
        return this.source.get();
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
            const result = this._nativeTake(source);
            if (result) {
                return {processed: result};
            }
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
