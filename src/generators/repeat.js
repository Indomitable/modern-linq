import { BaseLinqIterable } from "../base-linq-iterable";
export class RepeatIterable extends BaseLinqIterable {
    constructor(value, times) {
        super([]);
        this.value = value;
        this.times = times;
    }

    get() {
        return this;
    }

    [Symbol.iterator]() {
        let indx = 0;
        const max = this.times;
        const item = this.value;
        return {
            next() {
                if (indx < max) {
                    indx++;
                    return { done: false, value: item };
                } else {
                    return { done: true }
                }
            }
        };
    }
}
