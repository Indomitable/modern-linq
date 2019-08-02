const { range, fromIterable } = require('../../index');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const arrayInput = range(0, 100000).toArray();
const takeInput = fromIterable(arrayInput);

suite
    .add('Array slice', () => {
        arrayInput.slice(0, 1000);
    })
    .add('take', () => {
        takeInput.take(1000).toArray();
    })
    .on('complete', function () {
        const res0 = this[0];
        const res1 = this[1];
        console.log(res0.toString());
        console.log(res1.toString());
    })
    .run({ 'async': true });

