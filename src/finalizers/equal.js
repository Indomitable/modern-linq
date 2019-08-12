import { getIterator } from "../utils";

export class EqualFinalizer {
    static get(source, iterable, comparer) {
        const isEqual = typeof comparer === 'undefined' ? ((a, b) => a === b) : comparer;
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
}
