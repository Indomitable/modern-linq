/**
 * Take last N elements
 */
import { BaseLinqIterable } from "../base-linq-iterable";
import { doneValue, emptyIterator, iteratorResultCreator, LimitedQueue } from "../utils";

export class TakeLastIterable extends BaseLinqIterable {
    /**
     *
     * @param {Iterable} source
     * @param {number} count
     */
    constructor(source, count) {
        super(source);
        this.count = count <= 0 ? 0 : count;
    }

    /**
     * Create a class which works as FIFO, but has a limit if limit is reached
     * elements are removed
     */
    __createLimitedQueue() {
        class LimitedQueue {
            constructor(limit) {
                this.container = [];
                this.limit = limit;
            }

            push(item) {
                this.container.push(item);
                if (this.container.length > this.limit) {
                    this.container.shift();
                }
            }

            next() {
                if (this.container.length === 0) {
                    return doneValue();
                }
                return iteratorResultCreator(this.container.shift());
            }
        }
        return new LimitedQueue(this.count);
    }

    [Symbol.iterator]() {
        if (!this.count) {
            return emptyIterator();
        }
        const iterator = this._getSourceIterator();
        const queue = this.__createLimitedQueue();
        let isEndReached = false;
        return {
            next() {
                if (!isEndReached) {
                    let next = iterator.next();
                    while (!next.done) {
                        queue.push(next.value);
                        next = iterator.next();
                    }
                    isEndReached = true;
                }
                return queue.next();
            }
        };
    }
}
