import { range, from } from '../../index.esm.js';
import Benchmark from 'benchmark';

const arrayLength = 100000;
const iterable = new Set(range(0, arrayLength));
const array = Array.from(iterable);

export const arrayMapBenchmark = new Benchmark('[select] Array map', () => {
    array.map(_ => _ * 3);
});

export const selectArrayInput = new Benchmark('[select] array input', () => {
    from(array).select(_ => _ * 3).toArray();
});

export const selectIterableInput = new Benchmark('[select] iterable input', () => {
    from(iterable).select(_ => _ * 3).toArray();
});

export const selectIterate = new Benchmark('[selectIterate] iterate through iterable', () => {
    Array.from(from(iterable).select(_ => _ * 3));
});

export const selectIterateArray = new Benchmark('[selectIterate] iterate through array', () => {
    Array.from(from(array).select(_ => _ * 3));
});
