import { range, from } from '../../index.esm';
import Benchmark from 'benchmark';

const arrayLength = 100;
const iterable = new Set(range(0, arrayLength));

export const toArrayPushBench = new Benchmark('[to-array] array push from loop', () => {
    const result = [];
    for (const item of iterable) {
        result.push(item);
    }
});

export const toArrayArrayFromBench = new Benchmark('[to-array] Array.from native', () => {
    const result = Array.from(iterable);
});

export const toArrayPushLinqBench = new Benchmark('[to-array] from array push from loop', () => {
    const result = [];
    for (const item of from(iterable)) {
        result.push(item);
    }
});

export const toArrayLinqBench = new Benchmark('[to-array] from Array.from native', () => {
    const result = from(iterable).toArray();
});
