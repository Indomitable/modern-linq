import { range, from } from '../../index.esm.js';
import Benchmark from 'benchmark';

const arrayLength = 100000;
const iterable = new Set(range(0, arrayLength));
const array = Array.from(iterable);
const lengthToTake = 1000;

export const arraySliceBenchmark = new Benchmark('[take] Array slice', () => {
    array.slice(0, lengthToTake);
});

export const takeArrayInput = new Benchmark('[take] array input', () => {
    from(array).take(lengthToTake).toArray();
});

export const takeIterableInput = new Benchmark('[take] iterable input', () => {
    from(iterable).take(lengthToTake).toArray();
});


