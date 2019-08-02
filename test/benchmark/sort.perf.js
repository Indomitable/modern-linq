const { assert } = require('chai');
const { range, fromIterable, fromArrayLike } = require('../../index');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const linqIterableInput = range(100000, 0);
const arrayInput = linqIterableInput.toArray();
const linqArrayInput = fromIterable(arrayInput);

suite
    .add('Array sort', () => {
        const res = arrayInput.sort();
        assert.equal(res.length, 100000);
    })
    .add('order array', () => {
        const res = linqArrayInput.orderBy(_ => _ ).toArray();
        assert.equal(res.length, 100000);
    })
    .add('order iterable', () => {
        const res = linqIterableInput.orderBy(_ => _).toArray();
        assert.equal(res.length, 100000);
    })
    .on('complete', function () {
        for (const bench of fromArrayLike(this)) {
            console.log(bench.toString());
        }
    })
    .run({ 'async': true });

