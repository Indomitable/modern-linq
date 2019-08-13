import { getIterator } from "../utils";

export class AnyFinalizer {
    static get(source, predicate) {
        if (!predicate) {
            const iterator = getIterator(source);
            return !iterator.next().done;
        } else {
            for (const item of source) {
                if (predicate(item)) {
                    return true;
                }
            }
            return false;
        }
    }
}
