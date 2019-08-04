import { NativeProcessingLinqIterable } from "../base-linq-iterable";

export class UnionIterable extends NativeProcessingLinqIterable {
    /**
     * Creates a Union Iterable
     * @param {Iterable} source input iterable
     * @param {Iterable} second iterable to continue with
     */
    constructor(source, second) {
        super(source);
        this.second = second;
    }

    _nativeTake(array) {
        if (Array.isArray(this.second)) {
            return [...array, ...this.second];
        }
    }

    get() {
        return this;
    }

    [Symbol.iterator]() {
        const { processed, source } = this._tryNativeProcess();
        if (processed) {
            return this._getIterator(processed);
        }
        const iteratorFirst = this._getIterator(source);
        const iteratorSecond = this._getIterator(this.second);
        let firstDone = false;
        return {
            next() {
                if (!firstDone) {
                    const firstNext = iteratorFirst.next();
                    if (firstNext.done) {
                        firstDone = true;
                    }
                    else {
                        return {done: false, value: firstNext.value};
                    }
                }
                if (firstDone) {
                    const secondNext = iteratorSecond.next();
                    if (secondNext.done) {
                        return { done: true };
                    } else {
                        return { done: false, value: secondNext.value };
                    }
                }
            }
        }
    }
}