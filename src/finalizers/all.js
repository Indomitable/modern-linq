export class AllFinalizer {
    static get(source, predicate) {
        if (Array.isArray(source)) {
            return source.every(predicate);
        }
        for (const item of source) {
            if (!predicate(item)) {
                return false;
            }
        }
        return true;
    }

    static getAllAndEvery(source, predicate) {
        if (Array.isArray(source)) {
            return source.length > 0 && source.every(predicate);
        }
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
