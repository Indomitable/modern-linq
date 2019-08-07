import {getIterator} from "../utils";

export class FirstFinalizer {
    static get(source, predicate) {
        const iterable = source.get();
        if (predicate) {
            if (Array.isArray(iterable)) {
                return iterable.find(predicate);
            } else {
                return iterable.where(predicate).first();
            }
        }
        const iterator = getIterator(iterable);
        const { value } = iterator.next();
        return value;
    }

    static getOrDefault(source, def, predicate) {
        const iterable = source.get();
        if (predicate) {
            for (const item of iterable) {
                if (predicate(item)) {
                    return item;
                }
            }
            return def;
        } else {
            const iterator = getIterator(iterable);
            const {value, done} = iterator.next();
            return done ? def : value;
        }
    }

    static getOrThrow(source) {
        const iterator = getIterator(source.get());
        const { value, done } = iterator.next();
        if (done) {
            throw new TypeError('Sequence contains no items');
        }
        return value;
    }
}
