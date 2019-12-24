import {getIterator} from "../../utils";
import {ArrayFilterIterable} from "../where";
import {ToArrayArrayFinalizer} from "../../finalizers/to-array";

export default class ArrayIterable {
    constructor(array) {
        this.array = array;
    }

    [Symbol.iterator]() {
        return getIterator(this.array);
    }

    get() {
        return this.array;
    }

    where(predicate) {
        return new ArrayFilterIterable(this.array, predicate);
    }

    toArray(mapper) {
        return ToArrayArrayFinalizer.get(this, mapper);
    }
}
