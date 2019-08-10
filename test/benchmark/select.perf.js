import { range, from } from '../../index.esm.js';
import chai from 'chai';
import Benchmark from 'benchmark';

const assert = chai.assert;

const arrayLength = 100000;
const iterable = new Set(range(0, arrayLength));
const array = Array.from(iterable);

export const arrayMapBenchmark = new Benchmark('[select] Array map', () => {
    const res = array.map(_ => _ * 3);
    assert.equal(res.length, arrayLength);
});

export const selectArrayInput = new Benchmark('[select] array input', () => {
    const res = from(array).select(_ => _ * 3).toArray();
    assert.equal(res.length, arrayLength);
});

export const selectIterableInput = new Benchmark('[select] iterable input', () => {
    const res = from(iterable).select(_ => _ * 3).toArray();
    assert.equal(res.length, arrayLength);
});
