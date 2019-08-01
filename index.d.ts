declare module 'modern-linq' {
    export interface LinqIterable<TValue> extends Iterable<TValue> {
        /**
         * Filters the iterable using predicate function
         * @param predicate
         */
        where(predicate: (item: TValue) => boolean): LinqIterable<TValue>;
        /**
         * Maps the iterable items 
         * @param map map function
         */
        select<TOutput>(map: (item: TValue) => TOutput): LinqIterable<TOutput>;
        /**
         * Flat Iterable of collections 
         * @param map Function which returns a collection
         */
        selectMany<TOutput>(map: (item: TValue) => TOutput[]): LinqIterable<TOutput>;
        /**
         * Take first N items from iterable
         * @param count 
         */
        take(count: number): LinqIterable<TValue>;
        /**
         * Skip first N items from iterable
         * @param count 
         */
        skip(count: number): LinqIterable<TValue>;
        /**
         * Return distinct items. Can specify optional item comparer
         * @param count 
         */
        disticnt(comparer?: (a: TValue, b: TValue) => boolean): LinqIterable<TValue>;
        /**
         * Selects all items of type string
         * @param type 
         */
        ofType(type: 'string'): LinqIterable<string>;
        /**
         * Selects all items of type number
         * @param type 
         */
        ofType(type: 'number'): LinqIterable<number>;
        /**
         * Selects all items of type boolean
         * @param type 
         */
        ofType(type: 'boolean'): LinqIterable<boolean>;
        /**
         * Selects all items of type undefined
         * @param type 
         */
        ofType(type: 'undefined'): LinqIterable<undefined>;
        /**
         * Selects all items of type function
         * @param type 
         */
        ofType(type: 'function'): LinqIterable<Function>;
        /**
         * Selects all items of type object
         * @param type 
         */
        ofType(type: 'object'): LinqIterable<object>;
        /**
         * Selects all items of type symbol
         * @param type 
         */
        ofType(type: 'symbol'): LinqIterable<Symbol>;
        /**
         * Selects all items of base type 
         * @param type 
         */
        ofType<TOutput extends TValue>(type: { prototype: TOutput }): LinqIterable<TOutput>;

        /**
         * Group a list by key
         * @param keySelector function which extract the key from collection item
         */
        groupBy<TKey>(keySelector: (item: TValue) => TKey): IGrouping<TKey, TValue>;

        /**
         * Group a list by key
         * @param keySelector function which extract the key from collection item
         * @param elementSelector function which extract the element
         */
        groupBy<TKey, TElement>(keySelector: (item: TValue) => TKey, elementSelector: (item: TValue) => TElement): IGrouping<TKey, TElement>;

        /**
         * Group a list by key
         * @param keySelector 
         * @param resultCreator 
         */
        groupBy<TKey, TResult>(keySelector: (item: TValue) => TKey, resultCreator: (key: TKey, elements: LinqIterable<TValue>) => TResult): LinqIterable<TResult>;

        /**
         * Group a list by key
         * @param keySelector 
         * @param elementSelector 
         * @param resultCreator 
         */
        groupBy<TKey, TElement, TResult>(keySelector: (item: TValue) => TKey, elementSelector: (item: TValue) => TElement, resultCreator: (key: TKey, elements: LinqIterable<TElement>) => TResult): LinqIterable<TResult>;
        
        /**
         * Creates an array from iterable
         */
        toArray(): TValue[];

        /**
         * Creates a map from iterable
         */
        toMap<TKey>(keySelector: (item: TValue) => TKey): Map<TKey, TValue>;

        /**
         * Creates a map from iterable
         */
        toMap<TKey, TElement>(keySelector: (item: TValue) => TKey, valueSelector: (item: TValue) => TElement): Map<TKey, TElement>;

        /**
         * Creates a set from iterable
         */
        toSet(): Set<TValue>;        

        /**
         * Get first item of iterable
         */
        first(): TValue | undefined;
        /**
         * Get first item of iterable, if does not contain any return default 
         * @param def 
         */
        firstOrDefault(def: TValue): TValue;
        /**
         * Get first item of iterable, if no items throw RangeError
         */
        firstOrThrow(): TValue | never;
        /**
         * Checks if iterable has only one item and returns it. 
         * If the iterable does not contain items or has multiple throws RangeError
         */
        single(): TValue | never;
        /**
         * Checks if iterable has only one item and returns it. 
         * If the iterable does not contain items return default value.
         * If contains multiple throws RangeError
         */
        singleOrDefault(def: TValue): TValue | never;

        /**
         * Returns if all items satisfy the predicate. It returns true if no items.
         * @param predicate 
         */
        all(predicate: (item: TValue) => boolean): boolean;

        /**
         * Returns if all items satisfy the predicate. It returns false if no items.
         * @param predicate
         */
        allAndEvery(predicate: (item: TValue) => boolean): boolean;

        /**
         * Returns if any items satisfy the predicate.
         * @param predicate 
         */
        any(predicate: (item: TValue) => boolean): boolean;

        /**
         * Return number of items the sequence contains. 
         * @param predicate if specified, returns the count only on elements that satisfy it.
         */
        count(predicate?: (item: TValue) => boolean): number;
    }

    export interface IGrouping<TKey, TValue> extends LinqIterable<TValue> {
        key: TKey;
    }

    /**
     * Creates a select js iterable from iterable (arrays, map, set ...)
     * @param iterable 
     */
    export function fromIterable<TValue>(iterable: Iterable<TValue>): LinqIterable<TValue>;
    /**
     * Creates a select js iterable from an object (using Object.entries())
     * @param value 
     */
    export function fromObject<TValue extends {}>(value: TValue): LinqIterable<['string', object]>;
    /**
     * Creates a select js iterable containig a [from, to) range of numbers
     * if from is less than to return ascending range
     * if from is greater that to return descending range
     * if from === to returns empty iterable
     */
    export function range(from: number, to: number): LinqIterable<number>;
}
