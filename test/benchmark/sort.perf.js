import { range, from } from '../../index.esm.js';
import chai from  'chai';
import Benchmark from 'benchmark';

const assert = chai.assert;
const arrayLength = 100000;
const iterable = new Set(range(arrayLength, 0));
const array = Array.from(iterable);

const iterable1 = new Set(range(0, arrayLength));
const array1 = Array.from(iterable1);

export const arraySortBenchmarkCompare = new Benchmark('[orderBy] Array sort with compare', () => {
    const res = [...array].sort((a, b) => a - b);
    assert.equal(res.length, arrayLength);
});

export const arraySortBenchmark = new Benchmark('[orderBy] Array sort', () => {
    const res = [...array].sort();
    assert.equal(res.length, arrayLength);
});

export const orderByArrayInput = new Benchmark('[orderBy] array input', () => {
    const res = from(array).orderBy(_ => _ ).toArray();
    assert.equal(res.length, arrayLength);
});

export const orderByArrayInputCompare = new Benchmark('[orderBy] array input with compare', () => {
    const res = from(array).orderBy(_ => _, (a, b) => a - b).toArray();
    assert.equal(res.length, arrayLength);
});

export const orderByIterableInput = new Benchmark('[orderBy] iterable input', () => {
    const res = from(iterable).orderBy(_ => _).toArray();
    assert.equal(res.length, arrayLength);
});

export const orderByDecreaseArrayInputCompare = new Benchmark('[orderBy] array input with compare (Descending)', () => {
    const res = from(array1).orderByDescending(_ => _, (a, b) => a - b).toArray();
    assert.equal(res.length, arrayLength);
});

export const orderByDecreaseIterableInput = new Benchmark('[orderBy] iterable input (Descending)', () => {
    const res = from(iterable1).orderByDescending(_ => _).toArray();
    assert.equal(res.length, arrayLength);
});
