export class LastFinalizer {
    static get(source, predicate) {
        const { value} = LastFinalizer.__findLast(source, predicate);
        return value;
    }

    static getOrDefault(source, def, predicate) {
        const { found, value} = LastFinalizer.__findLast(source, predicate);
        return found ? value : def;
    }

    static getOrThrow(source, predicate) {
        const { found, value} = LastFinalizer.__findLast(source, predicate);
        if (found) {
            return value;
        } else {
            throw new TypeError('Sequence contains no items');
        }
    }

    static lastIndex(source, predicate) {
        let i = -1;
        let itemIndex = i;
        for (const item of source) {
            i++;
            if (predicate(item)) {
                itemIndex = i
            }
        }
        return itemIndex;
    }

    static __findLast(source, predicate) {
        let found = false;
        let value;
        for (const item of source) {
            if (!predicate || predicate(item)) {
                value = item;
                found = true;
            }
        }
        return { found, value };
    }
}
