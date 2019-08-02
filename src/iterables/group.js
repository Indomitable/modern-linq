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

    __group(source) {
        const map = new Map();
        const elementSelector = typeof this.elementSelector === 'undefined' ? _ => _ : this.elementSelector;
        for (const item of source) {
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

    get() {
        return this;
    }

    [Symbol.iterator]() {
        const source = this._getSource();
        const result = this.__group(source);
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
