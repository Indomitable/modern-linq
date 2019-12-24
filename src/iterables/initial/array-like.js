import {doneValue, getIterator, iteratorResultCreator} from "../../utils";

export default class ArrayLikeIterable {
    constructor(source) {
        this.source = source;
    }

    get() {
        return Array.isArray(this.source) ? this.source : this;
    }

    [Symbol.iterator]() {
        if (Array.isArray(this.source)) {
            return getIterator(this.source);
        }
        const length = this.source.length;
        const source = this.source;
        let current = 0;
        return {
            next() {
                if (current < length) {
                    const value = source[current];
                    current++;
                    return iteratorResultCreator(value);
                } else {
                    return doneValue();
                }
            }
        };
    }
}
