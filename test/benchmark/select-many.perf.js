import { from } from '../../index.esm.js';
import Benchmark from 'benchmark';

const input = [
    { values: [1, 2, 3, 4] },
    { values: [5, 6, 7] },
    { values: [8, 9, 10, 11] },
    { values: [12, 13, 14, 15, 16] },
    { values: [17, 18] },
    { values: [19, 20, 21] },
];

const extract = i => i.values;

export const arraySpeadBenchmark = new Benchmark('[select-many] Array push', () => {
    const result = [];
    for (const outer of input) {
        const inner = extract(outer);
        Array.prototype.push.apply(result, inner);
    }
});

export const selectManyBenchmark = new Benchmark('[select-many] selectMany', () => {
    const result = from(input).selectMany(extract).toArray();
});

export const generatorBenchmark = new Benchmark('[select-many] generator func', () => {
    function* generator() {
        for (const outer of input) {
            const inner = extract(outer);
            for (const value of inner) {
                yield value;
            }
        }
    }
    const result = Array.from(generator());
});

