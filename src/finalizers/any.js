export class AnyFinalizer {
    static get(source, predicate) {
        for (const item of source) {
            if (predicate(item)) {
                return true;
            }
        }
        return false;
    }
}
