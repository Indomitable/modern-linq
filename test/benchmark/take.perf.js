const { assert } = require('chai');
const { range, fromIterable, fromArrayLike } = require('../../index');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const linqIterableInput = range(0, 100000);
const arrayInput = Array.from(linqIterableInput);
const linqArrayInput = fromIterable(arrayInput);

const lengthToTake = 1000;
suite
    .add('Array slice', () => {
        const res = arrayInput.filter(i => i % 2 === 0).slice(0, lengthToTake);
        assert.equal(res.length, lengthToTake);
    })
    .add('take on array', () => {
        const res = linqArrayInput.where(i => i % 2 === 0).take(lengthToTake).toArray();
        assert.equal(res.length, lengthToTake);
    })
    .add('take on iterable', () => {
        const res = linqIterableInput.where(i => i % 2 === 0).take(lengthToTake).toArray();
        assert.equal(res.length, lengthToTake);
    })
    .on('complete', function () {
        for (const bench of fromArrayLike(this)) {
            console.log(bench.toString());
        }
    })
    .run({ 'async': true });

