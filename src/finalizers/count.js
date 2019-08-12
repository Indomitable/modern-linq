export class CountFinalizer {
    static get(source, predicate) {
        const iterable = source.get();
        if (Array.isArray(iterable)) {
            if (predicate) {
                return iterable.filter(predicate).length;
            }
            return iterable.length;
        }
        let i = 0;
        for (const item of iterable) {
            if ((predicate && predicate(item)) || !predicate) {
                i++;
            }
        }
        return i;
    }
}
