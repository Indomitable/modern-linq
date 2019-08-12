import { range, from } from '../../index.esm.js';
import Benchmark from 'benchmark';

const arrayLength = 100;
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

export const whereIterate = new Benchmark('[whereIterate] iterate through iterable', () => {
   Array.from(from(iterable).where(_ => _ % 2 === 1));
});

export const whereIterateArray = new Benchmark('[whereIterate] iterate through array', () => {
    Array.from(from(array).where(_ => _ % 2 === 1));
});
