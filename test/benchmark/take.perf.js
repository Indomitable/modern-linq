import { range, from } from '../../index.esm.js';
import chai from  'chai';
import Benchmark from 'benchmark';

const assert = chai.assert;

const arrayLength = 100000;
const iterable = new Set(range(0, arrayLength));
const array = Array.from(iterable);
const lengthToTake = 1000;

export const arraySliceBenchmark = new Benchmark('[take] Array slice', () => {
    const res = array.slice(0, lengthToTake);
    assert.equal(res.length, lengthToTake);
});

export const takeArrayInput = new Benchmark('[take] array input', () => {
    const res = from(array).take(lengthToTake).toArray();
    assert.equal(res.length, lengthToTake);
});

export const takeIterableInput = new Benchmark('[take] iterable input', () => {
    const res = from(iterable).take(lengthToTake).toArray();
    assert.equal(res.length, lengthToTake);
});


