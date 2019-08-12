import { range, from } from '../../index.esm.js';
import Benchmark from 'benchmark';

const arrayLength = 100000;
const iterable = new Set(range(arrayLength, 0));
const array = Array.from(iterable);

const iterable1 = new Set(range(0, arrayLength));
const array1 = Array.from(iterable1);

export const arraySortBenchmarkCompare = new Benchmark('[orderBy] Array sort with compare', () => {
    [...array].sort((a, b) => a - b);
});

export const arraySortBenchmark = new Benchmark('[orderBy] Array sort', () => {
    [...array].sort();
});

export const orderByArrayInput = new Benchmark('[orderBy] array input', () => {
    from(array).orderBy(_ => _ ).toArray();
});

export const orderByArrayInputCompare = new Benchmark('[orderBy] array input with compare', () => {
    from(array).orderBy(_ => _, (a, b) => a - b).toArray();
});

export const orderByIterableInput = new Benchmark('[orderBy] iterable input', () => {
    from(iterable).orderBy(_ => _).toArray();
});

export const orderByDecreaseArrayInputCompare = new Benchmark('[orderBy] array input with compare (Descending)', () => {
    from(array1).orderByDescending(_ => _, (a, b) => a - b).toArray();
});

export const orderByDecreaseIterableInput = new Benchmark('[orderBy] iterable input (Descending)', () => {
    from(iterable1).orderByDescending(_ => _).toArray();
});
