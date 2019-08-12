import { range, from } from '../../index.esm.js';
import Benchmark from 'benchmark';

const arrayLength = 100000;
const iterable = new Set(range(0, arrayLength));
const array = Array.from(iterable);

export const arrayFilterBenchmark = new Benchmark('[where] Array filter', () => {
    array.filter(_ => _ % 2 === 1);
});

export const whereArrayInput = new Benchmark('[where] array input', () => {
    from(array).where(_ => _ % 2 === 1).toArray();
});

export const whereIterableInput = new Benchmark('[where] iterable input', () => {
    from(iterable).where(_ => _ % 2 === 1).toArray();
});
