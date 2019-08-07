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
    The library is still in very early stage, but it will be actively developed

Build status:  
[![Build Status](https://travis-ci.com/Indomitable/modern-linq.svg?branch=master)](https://travis-ci.com/Indomitable/modern-linq)
