const { range, fromIterable, fromArrayLike } = require('../../index');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const arrayInput = range(0, 100000).toArray();
const linqInput = fromIterable(arrayInput);

suite
    .add('Array map', () => {
        arrayInput.filter(_ => _ % 2 === 0).map(_ => _ * 3);
    })
    .add('select', () => {
        linqInput.where(_ => _ % 2 === 0).select(_ => _ * 3).toArray();
    })
    .on('complete', function () {
        for (const bench of fromArrayLike(this)) {
            console.log(bench.toString());
        }
    })
    .run({ 'async': true });

