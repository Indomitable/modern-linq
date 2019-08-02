/**
 * Generates range of numbers [from, to)
 */
export class RangeIterable {
    /**
     * The range is [from, to)
     * @param {number} from
     * @param {number} to
     */
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    __ascendingRange() {
        const to = this.to;
        let current = this.from;
        return {
            next() {
                if (current < to) {
                    return { done: false, value: current++ };
                } else {
                    return { done: true };
                }
            }
        };
    }

    __descendingRange() {
        const to = this.to;
        let current = this.from;
        return {
            next() {
                if (current > to) {
                    return { done: false, value: current-- };
                } else {
                    return { done: true };
                }
            }
        };
    }

    [Symbol.iterator]() {
        if (this.from < this.to) {
            return this.__ascendingRange();
        }
        if (this.from > this.to) {
            return this.__descendingRange();
        }
        return {
            next() {
                return { done: true }
            }
        };
    }
}
