import { range, from } from '../../index.esm.js';
import chai from  'chai';
import Benchmark from 'benchmark';

const assert = chai.assert;
const arrayLength = 100000;
const lengthToSkip = 1000;
const expected = arrayLength - lengthToSkip;

const iterable = new Set(range(0, arrayLength));
const array = Array.from(iterable);

export const arraySliceBenchmark = new Benchmark('[skip] Array slice', () => {
    const res = array.slice(lengthToSkip, arrayLength);
    assert.equal(res.length, expected);
});

export const skipArrayInput = new Benchmark('[skip] array input', () => {
    const res = from(array).skip(lengthToSkip).toArray();
    assert.equal(res.length, expected);
});

export const skipIterableInput = new Benchmark('[skip] iterable input', () => {
    const res = from(iterable).skip(lengthToSkip).toArray();
    assert.equal(res.length, expected);
});

