import { BaseLinqIterable } from "../base-linq-iterable";

export class PageIterable extends BaseLinqIterable {
    constructor(source, pageSize) {
        super(source);
        this.pageSize = pageSize;
    }

    get() {
        return this;
    }

    [Symbol.iterator]() {
        const pageSize = this.pageSize;
        const iterator = this._getSourceIterator();
        let lastOne = false;
        return {
            next() {
                if (lastOne) {
                    return { done: true };
                }
                let count = 0;
                let page = [];
                while (count < pageSize) {
                    const next = iterator.next();
                    if (next.done) {
                        lastOne = true;
                        return { done: false, value: page };
                    }
                    page.push(next.value);
                    count++;
                }
                return { done: false, value: page };
            }
        }
    }
}