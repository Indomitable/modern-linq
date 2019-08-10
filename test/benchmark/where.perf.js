import { range, from } from '../../index.esm.js';
import chai from  'chai';
import Benchmark from 'benchmark';

const assert = chai.assert;

const arrayLength = 100000;
const iterable = new Set(range(0, arrayLength));
const array = Array.from(iterable);

export const arrayFilterBenchmark = new Benchmark('[where] Array filter', () => {
    const res = array.filter(_ => _ % 2 === 1);
    assert.equal(res.length, arrayLength / 2);
});

export const whereArrayInput = new Benchmark('[where] array input', () => {
    const res = from(array).where(_ => _ % 2 === 1).toArray();
    assert.equal(res.length, arrayLength / 2);
});

export const whereIterableInput = new Benchmark('[where] iterable input', () => {
    const res = from(iterable).where(_ => _ % 2 === 1).toArray();
    assert.equal(res.length, arrayLength / 2);
});
