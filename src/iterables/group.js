import { BaseLinqIterable } from "../base-linq-iterable";
import { fromIterable } from "../creation";
import { defaultElementSelector } from "../utils";

export class Grouping extends BaseLinqIterable {
    constructor(key, source) {
        super(source);
        this.key = key;
    }

    get() {
        return this.source;
    }

    [Symbol.iterator]() {
        return this._getIterator(this.source);
    }
}

export class GroupIterable extends BaseLinqIterable {
    constructor(source, keySelector, elementSelector, resultCreator) {
        super(source);
        if (typeof keySelector === 'undefined') {
            throw new Error('keyselector is required');
        }
        this.keySelector = keySelector;
        this.elementSelector = typeof elementSelector === 'undefined' ? defaultElementSelector : elementSelector;
        this.resultCreator = typeof resultCreator === 'undefined' ? (key, grouping) => (new Grouping(key, grouping)) : resultCreator;
    }

    static __group(iterable, keySelector, elementSelector) {
        const map = new Map();
        let i = 0;
        for (const item of iterable) {
            const key = keySelector(item, i);
            if ((key !== null && typeof key === 'object') || typeof key === "function") {
                throw new TypeError('groupBy method does not support keys to be objects or functions');
            }
            const element = elementSelector(item, i);
            const value = map.get(key) || [];
            value.push(element);
            map.set(key, value);
            i++;
        }
        return map;
    }

    [Symbol.iterator]() {
        const source = this._getSource();
        const result = GroupIterable.__group(source, this.keySelector, this.elementSelector);
        const groupIterator = this._getIterator(result);
        const resultCreator = this.resultCreator;
        return {
            next() {
                const { done, value } = groupIterator.next();
                if (done) {
                    result.clear();
                    return { done: true };
                }
                const [ key, grouping ] = value;
                return {
                    done: false,
                    value: resultCreator(key, fromIterable(grouping))
                };
            }
        }
    }
}
