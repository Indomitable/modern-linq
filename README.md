Modern-Linq
-------
Modern-Linq is a library that brings the C# linq functionality into JavaScript. It is based on the native Iterable funtionality in JavaScript.

Examples:
```js
const query = fromIterable([1, 2, 3, 4, 5, 6, 7])
               .where(_ => _ % 2 === 0)
               .select(_ => _ * 2);
```
```js 
const query = range(0, 30)
            .select(i => i * 3)
            .where(i => i > 10)
            .select(i =>
                ({
                    odd: i % 2 === 1,
                    even: i % 2 === 0,
                    num: i
                })
            )
            .skip(1)
            .take(4)
            .groupBy(i => i.odd)
            .select(_ => ({
                key: _.key,
                items: _.orderByDescending(_ => _.num).toArray()
            }))
            .orderBy(_ => _.key);
```

To consume the data we can use:
```js
const arr = query.toArray();
const arr = Array.from(query); 
for (const item of query) {
    console.log(item); // Prints 4, 8, 12
}
```
Remarks:

1. The data is processed in the moment when is requested.
2. The sequence is immutable the output !== input  


Some of the methods are using native Array implementation if the provided source is an Array
Methods with native fallback:
- `select`: uses Array.prototype.map 
- `where`: uses Array.prototype.filter
- `take`: uses Array.prototype.slice
- `skip`: uses Array.prototype.slice
- `distinct`: if no comparer is provided it uses native Set class
- `count`: returns Array.prototype.length
- `orderBy`: Array.prototype.sort
- `concat`: uses spread operator

Methods implemented:
- `aggregate`
- `any`
- `all`
- `concat`
- `count`
- `distinct`
- `elementAt`
- `first`
- `groupJoin`
- `join`
- `max`
- `min`
- `ofType`
- `orderBy`
- `range`
- `repeat`
- `reverse`
- `select`
- `selectMany`
- `isEqual` ( sequenceEqual )
- `single`
- `skip`
- `skipLast`
- `skipWhile`
- `sum`
- `take`
- `takeLast`
- `takeWhile`
- `union`
- `where`

- `toArray` ( toList )
- `toMap` ( toDictionary )
- `toSet`

Waiting for implementation:
- `contains`
- `except`
- `intersect`
- `last`
- `zip`

Extra methods
- `isElementsEqual`: checks if two sequences have same elements, no matter of the position.
- `product`: get the product of sequence.
- `join` (with string argument): join all elements of sequence and concat with separator
- `allAndEvery`: check a condition against all elements of sequence and sequence should not be empty.
- `firstOrThrow`: returns first element if none throw error.


Build status:  
[![Build Status](https://travis-ci.com/Indomitable/modern-linq.svg?branch=master)](https://travis-ci.com/Indomitable/modern-linq)
