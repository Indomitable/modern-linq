import {getIterator} from "../utils";

export class FirstFinalizer {
    static get(source, predicate) {
        if (predicate) {
            for (const item of source) {
                if (predicate(item)) {
                    return item;
                }
            }
        } else {
            const iterator = getIterator(source);
            const {value, done} = iterator.next();
            return done ? void 0 : value;
        }
    }

    static getOrDefault(source, def, predicate) {
        if (predicate) {
            for (const item of source) {
                if (predicate(item)) {
                    return item;
                }
            }
            return def;
        } else {
            const iterator = getIterator(source);
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
