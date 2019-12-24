export class ToArrayFinalizer {
    static get(source, map) {
        if (!map) {
            const iterable = source.get();
            return Array.isArray(iterable) ? iterable : Array.from(iterable);
        } else {
            return source.select(map).toArray();
        }
    }
}

/**
 * Return it is toArray finalizer which is used when source.get is 100% an array.
 * Used in native array iterators
 */
export class ToArrayArrayFinalizer {
    static get(source, mapper) {
        if (!mapper) {
            return source.get();
        }
        return source.get().map(mapper);
    }
}
