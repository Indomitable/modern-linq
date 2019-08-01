export class AnyFinalizer {
    static get(source, predicate) {
        if (Array.isArray(source)) {
            return source.some(predicate);
        }
        for (const item of source) {
            if (predicate(item)) {
                return true;
            }
        }
        return false;
    }
}
