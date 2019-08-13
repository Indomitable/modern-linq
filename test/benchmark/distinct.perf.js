import Benchmark from "benchmark";
import { Person } from "../unit/models";
import { from, range, repeat } from "../../index.esm";

const iterable = new Set(repeat(0, 1000).concat(repeat(1, 1000)));
const array = Array.from(iterable);

export const distinctCompareIterableBenchmark = new Benchmark('[distinct] Distinct iterable with compare', () => {
    from(iterable).distinct((a, b) => a === b).toArray();
});

export const distinctIterableBenchmark = new Benchmark('[distinct] Distinct iterable', () => {
    from(iterable).distinct().toArray();
});

export const distinctCompareArrayBenchmark = new Benchmark('[distinct] Distinct array with compare', () => {
    from(array).distinct((a, b) => a === b).toArray();
});

export const distinctArrayBenchmark = new Benchmark('[distinct] Distinct array', () => {
    from(array).distinct().toArray();
});
