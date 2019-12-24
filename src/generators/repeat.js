export default class RepeatIterable {
    constructor(value, times) {
        this.value = value;
        this.times = times;
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

    get() {
        return this;
    }
}
