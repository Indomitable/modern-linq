export class CountFinalizer {
    static get(source, predicate) {
        if (Array.isArray(source)) {
            if (predicate) {
                return source.filter(predicate).length;
            }
            return source.length;
        }
        let i = 0;
        const iterator = source[Symbol.iterator]();
        while (true) {
            let { done, value } = iterator.next();
            if (done) {
                return i;
            } else {
                if (predicate) {
                    if (predicate(value)) {
                        i++;
                    }
                } else {
                    i++;
                }
            }
        }
    }
}
