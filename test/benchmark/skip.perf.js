const { assert } = require('chai');
const { range, fromIterable, fromArrayLike } = require('../../index');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const arrayLength = 100000;
const linqIterableInput = range(0, arrayLength);
const arrayInput = linqIterableInput.toArray();
const linqArrayInput = fromIterable(arrayInput);

const lengthToSkip = 1000;
const expected = arrayLength - lengthToSkip;
suite
    .add('Array slice', () => {
        const res = arrayInput.slice(lengthToSkip, arrayLength);
        assert.equal(res.length, expected);
    })
    .add('skip on array', () => {
        const res = linqArrayInput.skip(lengthToSkip).toArray();
        assert.equal(res.length, expected);
    })
    .add('skip on iterable', () => {
        const res = linqIterableInput.skip(lengthToSkip).toArray();
        assert.equal(res.length, expected);
    })
    .on('complete', function () {
        for (const bench of fromArrayLike(this)) {
            console.log(bench.toString());
        }
    })
    .run({ 'async': true });

