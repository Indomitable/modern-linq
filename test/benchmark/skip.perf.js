import { range, from } from '../../index.esm.js';
import Benchmark from 'benchmark';

const arrayLength = 1000;
const lengthToSkip = 100;

const iterable = new Set(range(0, arrayLength));
const array = Array.from(iterable);

export const arraySliceBenchmark = new Benchmark('[skip] Array slice', () => {
    array.slice(lengthToSkip, arrayLength);
});

export const skipArrayInput = new Benchmark('[skip] array input', () => {
    from(array).skip(lengthToSkip).toArray();
});

export const skipIterableInput = new Benchmark('[skip] iterable input', () => {
    from(iterable).skip(lengthToSkip).toArray();
});

