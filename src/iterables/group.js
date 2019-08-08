import { BaseLinqIterable } from "../base-linq-iterable";
import { fromIterable } from "../creation";

export class Grouping extends BaseLinqIterable {
    constructor(key, source) {
        super(source.toArray());
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
        if (typeof elementSelector === 'function' && elementSelector.length === 2) {
            this.resultCreator = elementSelector;
        } else {
            this.elementSelector = elementSelector;
            this.resultCreator = resultCreator;
        }
    }

    static __group(iterable, keySelector, elementSelector) {
        const map = new Map();
        const elementCreator = typeof elementSelector === 'undefined' ? _ => _ : elementSelector;
        for (const item of iterable) {
            const key = keySelector(item);
            const element = elementCreator(item);
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

    get() {
        return this;
    }

    [Symbol.iterator]() {
        const source = this._getSource();
        const result = GroupIterable.__group(source, this.keySelector, this.elementSelector);
        const groupIterator = this._getIterator(result);
        const resultCreator = typeof this.resultCreator === 'undefined' ? (key, grouping) => (new Grouping(key, grouping)) : this.resultCreator;
        return {
            next() {
                const { done, value } = groupIterator.next();
                if (done) {
                    return { done: true };
                }
                const [ key, grouping ] = value;
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
