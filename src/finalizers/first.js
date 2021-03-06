export class FirstFinalizer {
    static get(source, predicate) {
        const { value } = FirstFinalizer.__findFirst(source, predicate);
        return value;
    }

    static getOrDefault(source, def, predicate) {
        const { found, value } = FirstFinalizer.__findFirst(source, predicate);
        return found ? value : def;
    }

    static getOrThrow(source, predicate) {
        const { found, value } = FirstFinalizer.__findFirst(source, predicate);
        if (found) {
            return value;
        } else {
            throw new TypeError('Sequence contains no items');
        }
    }

    static firstIndex(source, predicate) {
        let i = -1;
        for (const item of source) {
            i++;
            if (predicate(item)) {
                return i;
            }
        }
        return -1;
    }

    static __findFirst(source, predicate) {
        for (const item of source) {
            if (!predicate || predicate(item)) {
                return { found: true, value: item };
            }
        }
        return { found: false };
    }
}
