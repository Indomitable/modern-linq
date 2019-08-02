const { assert } = require('chai');
const { range, fromIterable, fromArrayLike } = require('../../index');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite('Where performance');

const linqIterableInput = range(0, 100000);
const arrayInput = linqIterableInput.toArray();
const linqArrayInput = fromIterable(arrayInput);

suite
    .add('Array filter', () => {
        const res = arrayInput.filter(_ => _ % 2 === 1);
        assert.equal(res.length, 50000);
    })
    .add('filter on array', () => {
        const res = linqArrayInput.where(_ => _ % 2 === 1).toArray();
        assert.equal(res.length, 50000);
    })
    .add('filter on iterable', () => {
        const res = linqIterableInput.where(_ => _ % 2 === 1).toArray();
        assert.equal(res.length, 50000);
    })
    .on('complete', function () {
        for (const bench of fromArrayLike(this)) {
            console.log(bench.toString());
        }
    })
    .run({ 'async': true });

