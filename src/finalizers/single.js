export class SingleFinalizer {
    static get (iterable) {
        const iterator = iterable[Symbol.iterator]();
        const { value, done } = iterator.next();
        if (done || !iterator.next().done ) {
            throw new RangeError('Sequence does not contain single item');
        }
        return value;
    }

    static getOrDefault (iterable, def) {
        const iterator = iterable[Symbol.iterator]();
        const { value, done } = iterator.next();
        if (!iterator.next().done) {
            throw new RangeError('Sequence contains multiple items');
        }
        return done ? def : value;
    }
}
