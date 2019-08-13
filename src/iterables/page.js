import { BaseLinqIterable } from "../base-linq-iterable";
import { doneValue, iteratorResultCreator } from "../utils";

export class PageIterable extends BaseLinqIterable {
    constructor(source, pageSize) {
        super(source);
        this.pageSize = pageSize;
    }

    [Symbol.iterator]() {
        const pageSize = this.pageSize;
        const iterator = this._getSourceIterator();
        let lastOne = false;
        return {
            next() {
                if (lastOne) {
                    return doneValue();
                }
                let count = 0;
                let page = [];
                while (count < pageSize) {
                    const next = iterator.next();
                    if (next.done) {
                        if (page.length === 0) {
                            return doneValue();
                        } else {
                            lastOne = true;
                            return iteratorResultCreator(page);
                        }
                    }
                    page.push(next.value);
                    count++;
                }
                return { done: false, value: page };
            }
        }
    }
}