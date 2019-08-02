export class AggregateFinalizer {
    static get(source, accumulator) {
        if (Array.isArray(source)) {
            return source.reduce(accumulator);
        }
        let res;
        let index = -1;
        for (const item of source) {
            if (index === -1) {
                res = item;
                index = 0;
            } else {
                index++;
                res = accumulator(res, item, index);
            }
        }
        if (index === -1) {
            throw new TypeError('No items in sequence');
        }
        return res;
    }

    static getWithInitial(source, accumulator, initial) {
        if (Array.isArray(source)) {
            return source.reduce(accumulator, initial);
        }
        let res = initial;
        let index = 0;
        for (const item of source) {
            index++;
            res = accumulator(res, item, index);
        }
        return res;
    }
}
