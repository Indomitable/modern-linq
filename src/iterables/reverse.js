import { BaseLinqIterable } from "../base-linq-iterable";
import { doneValue, iteratorResultCreator } from "../utils";

export class ReverseIterable extends BaseLinqIterable {
    constructor(source) {
        super(source);
    }

    [Symbol.iterator]() {
        const array = this.source.toArray();
        let index = array.length - 1;
        return {
            next() {
                if (index < 0) {
                    return doneValue();
                }
                const value = array[index];
                index--;
                return iteratorResultCreator(value);
            }
        }
    }
}
