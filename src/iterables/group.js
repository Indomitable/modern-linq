import { BaseLinqIterable } from "../base-linq-iterable";
import { fromIterable } from "../creation";

export class Grouping extends BaseLinqIterable {
    constructor(key, source) {
        super();
        this.key = key;
        this.source = source.toArray();
        this.isResulted = true;
        this.result = this.source;
    }

    [Symbol.iterator]() {
        const iterator = this._getResultIterator();
        return {
            next() {
                return iterator.next();
            }
        }
    }
}

export class GroupIterable extends BaseLinqIterable {
    constructor(source, keySelector, elementSelector, resultCreator) {
        super();
        this.source = source;
        if (typeof keySelector === 'undefined') {
            throw new Error('keyselector is required');
        }
        this.keySelector = keySelector;
        if (typeof elementSelector === 'function' && elementSelector.length === 2) {
            this.resultCreator = elementSelector;
        } else {
            this.elementSelector = elementSelector;
            this.resultCreator = resultCreator;
        }
    }
    
    __group() {
        const map = new Map();
        const elementSelector = typeof this.elementSelector === 'undefined' ? _ => _ : this.elementSelector;
        for (const item of this.source) {
            const key = this.keySelector(item);
            const element = elementSelector(item);
            let value = map.get(key);
            if (typeof value === 'undefined') {
                value = [ element ];
            } else {
                value.push(element);
            }
            map.set(key, value);
        }
        return map;
    }

    [Symbol.iterator]() {
        const groupIterator = this.__group()[Symbol.iterator]();
        const resultCreator = typeof this.resultCreator === 'undefined' ? (key, grouping) => ( new Grouping(key, grouping) ) : this.resultCreator;
        return {
            next() {
                const { done, value } = groupIterator.next();
                if (done) {
                    return { done: true };
                }
                const [key, grouping] = value;
                const linqGrouping = fromIterable(grouping);
                const result = resultCreator(key, linqGrouping);
                return {
                    done: false,
                    value: result
                };
            }
        }
    }
}