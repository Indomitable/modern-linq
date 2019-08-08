const { assert } = require('chai');
const { range, fromIterable, from } = require('../../index');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const linqIterableInput = new Set(range(0, 100000));
const arrayInput = linqIterableInput.toArray();
const linqArrayInput = fromIterable(arrayInput);

suite
    .add('Array map', () => {
        const res = arrayInput.map(_ => _ * 3);
        assert.equal(res.length, 100000);
    })
    .add('select from array', () => {
        const res = linqArrayInput.select(_ => _ * 3).toArray();
        assert.equal(res.length, 100000);
    })
    .add('select from iterable', () => {
        const res = linqIterableInput.select(_ => _ * 3).toArray();
        assert.equal(res.length, 100000);
    })
    .on('complete', function () {
        for (const bench of from(this)) {
            console.log(bench.toString());
        }
    })
    .run({ 'async': true });

