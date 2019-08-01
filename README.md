Modern-Linq
-------
Modern-Linq is a library that brings the C# linq functionality into JavaScript. It is based on the native Iterable funtionality in JavaScript.

Examples:
```js
const source = fromIterable([1, 2, 3, 4, 5, 6, 7])
               .where(_ => _ % 2 === 0)
               .select(_ => _ * 2);
```
To consume the data we can use:
```js
const arr = source.toArray();
```
or
```js
for (const item of arr) {
    console.log(item); // Prints 4, 8, 12
}
```

Remarks:  
    The library is still in very early stage, but it will be actively developed

Build status:  
[![Build Status](https://travis-ci.com/Indomitable/modern-linq.svg?branch=master)](https://travis-ci.com/Indomitable/modern-linq)
