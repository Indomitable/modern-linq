import {getIterator} from "../utils";

export class SingleFinalizer {
    static get(source, predicate) {
        const iterable = source.get();
        let result;
        let count = 0;
        let i = 0;
        for (const item of iterable) {
            if ((predicate && predicate(item)) || !predicate) {
               result = item;
               count++;
            }
            if (count > 1) {
                throw new TypeError('Sequence contains multiple items');
            }
            if (!predicate && count > 0 && i > 0) {
                throw new TypeError('Sequence contains multiple items');
            }
            i++;
        }
        if (count === 0) {
            throw new TypeError('Sequence contains no items');
        }
        return result;
    }

    static getOrDefault(source, def, predicate) {
        const iterable = source.get();
        let result;
        let count = 0;
        let i = 0;
        for (const item of iterable) {
            if ((predicate && predicate(item)) || !predicate) {
                result = item;
                count++;
            }
            if (count > 1) {
                throw new TypeError('Sequence contains multiple items');
            }
            if (!predicate && count > 0 && i > 0) {
                throw new TypeError('Sequence contains multiple items');
            }
            i++;
        }
        if (count === 0) {
            return def;
        }
        return result;
    }
}
