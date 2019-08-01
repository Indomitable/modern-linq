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
    
    __increaseRange() {
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

    __decreaseRange() {
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
            return this.__increaseRange();
        }
        if (this.from > this.to) {
            return this.__decreaseRange();
        }
        return { next() { return { done: true } } };        
    }
}
