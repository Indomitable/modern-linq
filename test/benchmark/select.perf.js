const { range, fromIterable } = require('../../index');
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
    const res0 = this[0];
    const res1 = this[1];
    console.log(res0.toString());
    console.log(res1.toString());
})
.run({ 'async': true });

