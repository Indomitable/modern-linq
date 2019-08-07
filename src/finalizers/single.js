export class SingleFinalizer {
    static get(source, predicate) {
        let result;
        let count = 0;
        for (const item of source) {
            if ((predicate && predicate(item)) || !predicate) {
               result = item;
               count++;
            }
            if (count > 1) {
                throw new TypeError('Sequence contains multiple items');
            }
        }
        if (count === 0) {
            throw new TypeError('Sequence contains no items');
        }
        return result;
    }

    static getOrDefault(source, def, predicate) {
        let result;
        let count = 0;
        for (const item of source) {
            if ((predicate && predicate(item)) || !predicate) {
                result = item;
                count++;
            }
            if (count > 1) {
                throw new TypeError('Sequence contains multiple items');
            }
        }
        if (count === 0) {
            return def;
        }
        return result;
    }
}
