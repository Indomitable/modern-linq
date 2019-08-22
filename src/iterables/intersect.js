import { BaseLinqIterable } from "../base-linq-iterable";
import { defaultEqualityComparer, doneValue, iteratorResultCreator } from "../utils";
import { from } from "../creation";
import { WhereIterable } from "./where";

/**
 * Returns an intersect of two sequences, does not return duplicates
 */
export class IntersectIterable extends BaseLinqIterable {
    constructor(source, other, comparer) {
        super(source);
        this.other = other;
        this.comparer = !!comparer ? comparer : defaultEqualityComparer;
    }

    __createContainingChecker() {
        class Checker {
            constructor(other, comparer) {
                this.other = from(other).distinct(comparer).toArray();
                this.comparer = comparer;
            }

            has(value) {
                const index = from(this.other).firstIndex(item => this.comparer(value, item));
                if (index > -1) {
                    this.other.splice(index, 1);
                    return true;
                }
                return false;
            }
        }
        return new Checker(this.other, this.comparer);
    }

    [Symbol.iterator]() {
        const checker = this.__createContainingChecker(this.other, this.comparer);
        const iterator = this._getSourceIterator();
        return {
            next() {
                return WhereIterable.__findNext(iterator, (item) => checker.has(item));
            }
        }
    }
}
