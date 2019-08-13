import { BaseLinqIterable } from "../base-linq-iterable";
import { SetCheck } from "../utils";

export class UnionIterable extends BaseLinqIterable {
    constructor(source, second) {
        super(source);
        this.second = second;
    }

    static __getNext(firstIterator, firstDone, secondIterator, secondDone, set) {
        while (!firstDone || !secondDone) {
            if (!firstDone) {
                const next = firstIterator.next();
                if (!next.done && set.tryAdd(next.value)) {
                    return next;
                }
                if (next.done) {
                    firstDone = true;
                }
            }
            if (firstDone && !secondDone) {
                const next = secondIterator.next();
                if (!next.done && set.tryAdd(next.value)) {
                    return next;
                }
                if (next.done) {
                    secondDone = true;
                }
            }
        }
        if (firstDone && secondDone) {
            set.clear();
            return { done: true };
        }
    }

    [Symbol.iterator]() {
        const firstIterator = this._getIterator(this.source);
        const secondIterator = this._getIterator(this.second);
        const set = new SetCheck();
        let firstDone = false;
        let secondDone = false;
        return {
            next() {
                return UnionIterable.__getNext(firstIterator, firstDone, secondIterator, secondDone, set);
            }
        };
    }
}