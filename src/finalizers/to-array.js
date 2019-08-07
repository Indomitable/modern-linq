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
