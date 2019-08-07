export class AllFinalizer {
    static get(source, predicate) {
        for (const item of source) {
            if (!predicate(item)) {
                return false;
            }
        }
        return true;
    }

    static getAllAndEvery(source, predicate) {
        let hasItems = false;
        for (const item of source) {
            hasItems = true;
            if (!predicate(item)) {
                return false;
            }
        }
        return hasItems;
    }
}
