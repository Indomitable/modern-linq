import { range, from } from '../../index.esm.js';
import chai from  'chai';
import Benchmark from 'benchmark';

const assert = chai.assert;
const arrayLength = 100000;
const iterable = new Set(range(arrayLength, 0));
const array = Array.from(iterable);

export const arraySliceBenchmark = new Benchmark('[orderBy] Array sort', () => {
    const res = array.sort();
    assert.equal(res.length, arrayLength);
});

export const orderByArrayInput = new Benchmark('[orderBy] array input', () => {
    const res = from(array).orderBy(_ => _ ).toArray();
    assert.equal(res.length, arrayLength);
});

export const orderByIterableInput = new Benchmark('[orderBy] iterable input', () => {
    const res = from(iterable).orderBy(_ => _).toArray();
    assert.equal(res.length, arrayLength);
});
