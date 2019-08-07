import {NativeProcessingLinqIterable} from "../base-linq-iterable";

/**
 * Skip first N numbers of source and return the rest
 */
export class SkipIterable extends NativeProcessingLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {number} count
     */
    constructor(source, count) {
        super(source);
        this.count = count;
    }

    _nativeTake(array) {
        return array.slice(this.count, array.length);
    }

    [Symbol.iterator]() {
        const { processed, source } = this._tryNativeProcess();
        if (processed) {
            return this._getIterator(processed);
        }
        const iterator = this._getIterator(source);
        const count = this.count;
        let skipped = 0;
        return {
            next() {
                if (skipped === 0) {
                    // first get. 
                    while (skipped < count) {
                        const { done } = iterator.next();
                        skipped++;
                        if (done) {
                            return { done: true };
                        }
                    }
                }
                return iterator.next();
            }
        };
    }
}
