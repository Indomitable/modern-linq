import { NativeProcessingLinqIterable } from "../base-linq-iterable";
import { doneValue, iteratorResultCreator } from "../utils";

/**
 * Return first N numbers of source
 */
export class TakeIterable extends NativeProcessingLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {number} count
     */
    constructor(source, count) {
        super(source);
        this.count = count <= 0 ? 0 : count;
    }

    _nativeTake(array) {
        return array.slice(0, this.count);
    }

    [Symbol.iterator]() {
        const { processed, source } = this._tryNativeProcess();
        if (processed) {
            return this._getIterator(processed);
        }
        const iterator = this._getIterator(source);
        const count = this.count;
        let fetched = 0;
        return {
            next() {
                if (fetched < count) {
                    const { done, value } = iterator.next();
                    fetched++;
                    if (done) {
                        return doneValue();
                    }
                    return iteratorResultCreator(value);
                }
                return doneValue();
            }
        };
    }
}
