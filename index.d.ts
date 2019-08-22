declare module 'modern-linq' {
    export interface LinqIterable<TValue> extends Iterable<TValue> {
        /**
         * Filters the iterable using predicate function typed overload
         * @param predicate
         */
        where<TSubValue extends TValue>(predicate: (item: TValue) => item is TSubValue): LinqIterable<TSubValue>;

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
         * @param innerSelector Function which returns an inner collection
         */
        selectMany<TInner>(innerSelector: (item: TValue) => TInner[]): LinqIterable<TInner>;

        /**
         * Flat iterable of collection
         * @param innerSelector Function which returns an inner collection
         * @param resultCreator Function thish converts pair of outer and inner element to result.
         */
        selectMany<TInner, TResult>(innerSelector: (item: TValue) => TInner[], resultCreator: (outer: TValue, inner: TInner) => TResult): LinqIterable<TResult>;
        /**
         * Take first N items from iterable
         * @param count
         */
        take(count: number): LinqIterable<TValue>;
        /**
         * Return items while condition return true
         * @param condition
         */
        takeWhile(condition: (item: TValue, index: number) => boolean): LinqIterable<TValue>;
        /**
         * Take last N items from iterable
         * @param count
         */
        takeLast(count: number): LinqIterable<TValue>;
        /**
         * Skip first N items from iterable
         * @param count
         */
        skip(count: number): LinqIterable<TValue>;
        /**
         * Skip items while condition return true, get the rest
         * @param condition
         */
        skipWhile(condition: (item: TValue, index: number) => boolean): LinqIterable<TValue>;
        /**
         * Skip last N items from iterable
         * @param count
         */
        skipLast(count: number): LinqIterable<TValue>;
        /**
         * Return distinct items. Can specify optional item comparer
         * @param comparer function to compare elements for equality
         */
        distinct(comparer?: (a: TValue, b: TValue) => boolean): LinqIterable<TValue>;

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
         * @param typeCheck
         */
        ofType<TOutput extends TValue>(typeCheck: (item: TValue) => item is TOutput): LinqIterable<TOutput>;

        /**
         * Selects all items of base type
         * @param type
         */
        ofClass<TOutput extends TValue>(type: { prototype: TOutput }): LinqIterable<TOutput>;

        /**
         * Group items
         * @param keySelector group key selector
         */
        groupBy<TKey>(keySelector: (item: TValue, index: number) => TKey): LinqIterable<IGrouping<TKey, TValue>>;

        groupBy<TKey, TElement>(keySelector: (item: TValue, index: number) => TKey, elementSelector: (item: TValue, index: number) => TElement): LinqIterable<IGrouping<TKey, TElement>>;

        groupBy<TKey, TElement, TResult>(keySelector: (item: TValue, index: number) => TKey, elementSelector: (item: TValue, index: number) => TElement,
                                         resultCreator: (key: TKey, items: LinqIterable<TElement>) => TResult): LinqIterable<TResult>;

        /**
         * Order by iterable by a key
         * @param keySelector
         * @param comparer optional comparer.
         */
        orderBy<TKey>(keySelector: (item: TValue) => TKey, comparer?: (first: TKey, second: TKey) => number): LinqIterable<TValue>;

        /**
         * Order by descending iterable by a key
         * @param keySelector
         * @param comparer optional comparer.
         */
        orderByDescending<TKey>(keySelector: (item: TValue) => TKey, comparer?: (first: TKey, second: TKey) => number): LinqIterable<TValue>;

        /**
         * Do a group join (left join) between current and external iterable. For each item of current sequence get array of items from external sequence.
         * @param joinIterable external iterable
         * @param sourceKeySelector current iterable key selector
         * @param joinIterableKeySelector current iterable key selector
         * @param resultCreator function which accepts two arguments: first: element from current sequence and second: array of items from the external sequence.
         */
        groupJoin<TInner, TKey, TResult>(joinIterable: Iterable<TInner>,
                                         sourceKeySelector: (item: TValue) => TKey,
                                         joinIterableKeySelector: (item: TInner, index: number) => TKey,
                                         resultCreator: (outer: TValue, inner: TInner[]) => TResult): LinqIterable<TResult>;


        /**
         * Do an inner join between current and external sequence. For each item of current sequence get a item from external sequence.
         * @param joinIterable external iterable
         * @param sourceKeySelector current iterable key selector
         * @param joinIterableKeySelector current iterable key selector
         * @param resultCreator function which accepts two arguments: first: element from current sequence and second: element from the external sequence.
         */
        join<TInner, TKey, TResult>(joinIterable: Iterable<TInner>,
                                    sourceKeySelector: (item: TValue) => TKey,
                                    joinIterableKeySelector: (item: TInner, index: number) => TKey,
                                    resultCreator: (outer: TValue, inner: TInner) => TResult): LinqIterable<TResult>;
        /**
         * Concat this iterable with another
         * @param secondIterable
         */
        concat(secondIterable: Iterable<TValue>): LinqIterable<TValue>;

        /**
         * Produce a union of two iterables where the result is distinct values from both.
         * @param secondIterable
         */
        union(secondIterable: Iterable<TValue>): LinqIterable<TValue>;

        /**
         * Return an intersection of two iterables where the result is distinct values.
         * @param secondIterable
         */
        intersect(secondIterable: Iterable<TValue>): LinqIterable<TValue>;

        /**
         * Return an intersection of two iterables where the result is distinct values.
         * @param secondIterable
         * @param comparer optional predicate, if none is provided a default one (===) is used.
         */
        intersect<TSecond = TValue>(secondIterable: Iterable<TSecond>, comparer?: (first: TValue, second: TSecond) => boolean): LinqIterable<TValue>;

        /**
         * Create a paging
         * @param pageSize
         */
        page(pageSize: number): LinqIterable<TValue[]>;

        /**
         * Reverse the sequence
         */
        reverse(): LinqIterable<TValue[]>;

        /**
         * Creates an array from iterable
         */
        toArray(): TValue[];

        /**
         * Creates an array from iterable, using map function which creates an array of mapped items.
         */
        toArray<TResult>(map: (item: TValue) => TResult): TResult[];

        /**
         * Create a map object from sequence
         * @param keySelector - key selector - keys should be unique, otherwise last keys will override first.
         */
        toMap<TKey>(keySelector: (item: TValue) => TKey): Map<TKey, TValue>;

        /**
         * Create a map object from sequence
         * @param keySelector key selector - keys should be unique, otherwise last keys will override first.
         * @param elementSelector element selector
         */
        toMap<TKey, TElement>(keySelector: (item: TValue) => TKey, elementSelector: (item: TValue) => TElement): Map<TKey, TElement>;

        /**
         * Creates a set from current sequence.
         */
        toSet(): Set<TValue>;

        /**
         * Get first item of iterable
         * @param predicate optional predicate for the item
         */
        first(predicate?: (item: TValue) => boolean): TValue | undefined;

        /**
         * Get first item of iterable, if does not contain any return default
         * @param def
         * @param predicate
         */
        firstOrDefault(def: TValue, predicate?: (item: TValue) => boolean): TValue;

        /**
         * Get first item of iterable, if no items throw TypeError
         */
        firstOrThrow(predicate?: (item: TValue) => boolean): TValue | never;

        /**
         * Get index of first found item in sequence
         * @param predicate predicate for the item
         * @return index of item, when not found -1
         */
        firstIndex(predicate: (item: TValue) => boolean): number;

        /**
         * Get last item of iterable
         * @param predicate optional predicate for the item
         */
        last(predicate?: (item: TValue) => boolean): TValue | undefined;

        /**
         * Get last item of iterable, if does not contain any return default
         * @param def
         * @param predicate optional check function
         */
        lastOrDefault(def: TValue, predicate?: (item: TValue) => boolean): TValue;

        /**
         * Get last item of iterable, if no items throw TypeError
         * @param predicate optional check function
         */
        lastOrThrow(predicate?: (item: TValue) => boolean): TValue | never;

        /**
         * Get index of last found item in sequence
         * @param predicate predicate for the item
         * @return index of item, when not found -1
         */
        lastIndex(predicate: (item: TValue) => boolean): number;

        /**
         * Checks if iterable has only one item and returns it.
         * @throws TypeError when no or multiple elements
         */
        single(predicate?: (item: TValue) => boolean): TValue | never;

        /**
         * Checks if iterable has only one item and returns it.
         * If the iterable does not contain items return default value.
         * @throws TypeError when multiple elements
         */
        singleOrDefault(def: TValue, predicate?: (item: TValue) => boolean): TValue | never;

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
        any(predicate?: (item: TValue) => boolean): boolean;

        /**
         * Return count of items.
         * @param predicate if predicate is supplied then return the count of items that return true.
         */
        count(predicate?: (item: TValue) => boolean): boolean;

        /**
         * Produce single value form sequence values. The initial value is first element.
         * @param accumulator function which produces the result.
         * @throws TypeError when no elements
         */
        aggregate<TResult>(accumulator: (result: TResult, item: TValue, index: number) => TResult): TResult | never;

        /**
         * Produce single value form sequence values. The initial value is the second argument.
         * @param accumulator function which produces the result.
         * @param initial initial value
         */
        aggregate<TResult>(accumulator: (result: TResult, item: TValue, index: number) => TResult, initial: TResult): TResult;

        /**
         * Produce a sum of sequence values
         * @throws {TypeError} if not items in sequence
         */
        sum(): TValue | never;

        /**
         * Produce a product of sequence values
         * @throws {TypeError} if not items in sequence
         */
        product(): TValue | never;

        /**
         * Get min value in sequence
         * @param comparer optional comparer function, which should return negative when left lower than right, positive when left greater than right or zero when equal
         * @throws {TypeError} if not items in sequence
         */
        min(comparer?: (left: TValue, right: TValue) => number): TValue | never;

        /**
         * Get max value in sequence
         * @param comparer optional comparer function, which should return negative when left lower than right, positive when left greater than right or zero when equal
         * @throws {TypeError} if not items in sequence
         */
        max(comparer?: (left: TValue, right: TValue) => number): TValue | never;

        /**
         * join items of sequence in one string.
         * @param separator
         */
        join(separator: string): string;

        /**
         * Return element at specific index
         * @param index index of requested element.
         * @return undefined when no index out of range.
         */
        elementAt(index: number): TValue | undefined;

        /**
         * do action over every item in the sequence
         * @param action
         */
        forEach(action: (item: TValue) => void): void;

        /**
         * Check if current sequence is equal to another sequence.
         * @param iterable
         */
        isEqual(iterable: Iterable<TValue>): boolean;
        isEqual<TAnotherValue>(iterable: Iterable<TAnotherValue>, comparer: (a: TValue, b: TAnotherValue) => boolean): boolean;

        /**
         * Check if current sequence is equal to another sequence even that positions of elements are different
         * @param iterable
         * @example from([1, 2, 3]).isElementEqual([3, 1, 2]) === true
         */
        isElementsEqual(iterable: Iterable<TValue>): boolean;
        isElementsEqual<TAnotherValue>(iterable: Iterable<TAnotherValue>, comparer: (a: TValue, b: TAnotherValue) => boolean): boolean;
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
     * Creates a select js iterable from an object resolving keys using Object.keys(). Returns enumerable keys.
     * @param value
     * @return sequence of key/value object.
     */
    export function fromObject<TValue extends {}, TKey extends keyof TValue>(value: TValue): LinqIterable<{ key: string, value: TValue[TKey] }>;

    /**
     * Creates a select js iterable from an object resolving keys using Object.keys(). Returns enumerable keys.
     * @param value
     * @return sequence of key/value object.
     */
    export function fromObject<TValue extends {}, TKey extends keyof TValue, TResult>(value: TValue, resultCreator: (key: TKey, value: TValue[TKey]) => TResult): LinqIterable<TResult>;

    /**
     * Creates linq iterable from array like object
     * @param arrayLike
     */
    export function fromArrayLike<TValue>(arrayLike: ArrayLike<TValue>): LinqIterable<TValue>;

    /**
     * Creates a select js iterable containing a [from, to) range of numbers
     * if from is less than to return ascending range
     * if from is greater that to return descending range
     * if from === to returns empty iterable
     */
    export function range(from: number, to: number): LinqIterable<number>;

    /**
     * General from function which except various source types
     * @param iterable or array like objects
     */
    export function from<TValue>(iterable: Iterable<TValue>|ArrayLike<TValue>): LinqIterable<TValue>;

    /**
     * Alias for fromObject function.
     * @param value
     */
    export function from<TValue extends {}, TKey extends keyof TValue>(value: TValue): LinqIterable<{ key: string, value: TValue[TKey] }>;

    /**
     * Creates a select js iterable containing a [from, to) range of numbers
     * if from is less than to return ascending range
     * if from is greater that to return descending range
     * if from === to returns empty iterable
     */
    export function repeat<TValue>(value: TValue, times: number): LinqIterable<TValue>;
}
