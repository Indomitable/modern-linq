import {NativeProcessingLinqIterable} from "../base-linq-iterable";

/**
 * Return mapped array [1, 2, 3].select(x => x * 2) === [2, 4, 6]
 */
export class SelectIterable extends NativeProcessingLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {Function} map
     */
    constructor(source, map) {
        super(source);
        this.map = map;
    }

    _nativeTake(array) {
        return array.map(this.map);
    }

    [Symbol.iterator]() {
        const { processed, source } = this._tryNativeProcess();
        if (processed) {
            return this._getIterator(processed);
        }
        const iterator = this._getIterator(source);
        const map = this.map;
        return {
            next() {
                const { done, value } = iterator.next();
                if (done) {
                    return {
                        done: true
                    };
                }
                return {
                    done: false,
                    value: map(value)
                };
            }
        };
    }
}
