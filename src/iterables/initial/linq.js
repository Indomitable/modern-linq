import { getIterator } from "../../utils";

export default class LinqIterable {
    constructor(source) {
        this.source = source;
    }

    [Symbol.iterator]() {
        return getIterator(this.source);
    }

    get() {
        return this;
    }
}
