export class FirstFinalizer {
    static get(iterable) {
        const iterator = iterable[Symbol.iterator]();
        const { value } = iterator.next();
        return value;
    }

    static getOrDefault(iterable, def) {
        const iterator = iterable[Symbol.iterator]();
        const { value, done } = iterator.next();
        return done ? def : value;
    }

    static getOrThrow(iterable, def) {
        const iterator = iterable[Symbol.iterator]();
        const { value, done } = iterator.next();
        if (done) {
            throw new RangeError('Sequence contains no items');
        }
        return value;
    }
}
