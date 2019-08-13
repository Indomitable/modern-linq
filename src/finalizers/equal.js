import { defaultEqualityComparer, getIterator } from "../utils";

export class EqualFinalizer {
    static get(source, iterable, comparer) {
        const isEqual = typeof comparer === 'undefined' ? defaultEqualityComparer : comparer;
        const sourceIterator = getIterator(source);
        const otherIterator = getIterator(iterable);
        let thisDone = false;
        while (!thisDone) {
            const thisNext = sourceIterator.next();
            const otherNext = otherIterator.next();
            if (thisNext.done !== otherNext.done ||
                (!thisNext.done && !otherNext.done && !isEqual(thisNext.value, otherNext.value))) {
                return false;
            }
            thisDone = thisNext.done;
        }
        return true;
    }

    static getDifferentPosition(source, iterable, comparer) {
        const isEqual = typeof comparer === 'undefined' ? defaultEqualityComparer : comparer;
        const sourceIterator = getIterator(source);
        const otherArray = Array.isArray(iterable) ? [...iterable] : Array.from(iterable);
        let thisDone = false;
        while (!thisDone) {
            const next = sourceIterator.next();
            thisDone = next.done;
            if (!next.done && otherArray.length === 0 || next.done && otherArray.length > 0) {
                return false;
            }
            if (next.done && otherArray.length === 0) {
                return true;
            }
            const startLength = otherArray.length;
            for (let i = 0; i < otherArray.length; i++) {
                const otherValue = otherArray[i];
                if (isEqual(next.value, otherValue)) {
                    otherArray.splice(i, 1);
                    break;
                }
            }
            if (startLength === otherArray.length) {
                // if not removed not equal
                return false;
            }
        }
        return otherArray.length === 0; // all elements removed.
    }
}
