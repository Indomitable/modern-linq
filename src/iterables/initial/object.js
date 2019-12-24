import {doneValue, iteratorResultCreator} from "../../utils";

export default class ObjectIterable {
    constructor(source, resultCreator) {
        this.source = source;
        this.resultCreator = typeof resultCreator === 'undefined' ? ObjectIterable.__defaultResultCreator : resultCreator;
    }

    static __defaultResultCreator(key, value) {
        return { key, value };
    }

    [Symbol.iterator]() {
        const obj = this.source;
        const resultCreator = this.resultCreator;
        const keys = Object.keys(obj);
        let index = 0;
        return {
            next() {
                if (index < keys.length) {
                    const key = keys[index];
                    const value = obj[key];
                    index++;
                    return iteratorResultCreator(resultCreator(key, value));
                } else {
                    return doneValue();
                }
            }
        };
    }

    get() {
        return this;
    }
}
