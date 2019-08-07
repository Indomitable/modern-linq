import { assert, expect } from 'chai';
import { from, fromArrayLike, fromIterable, fromObject, range } from "../../src";

describe('from creation tests', () => {
    it('should create a linq iterable from collection', () => {
        const val = fromIterable([1, 2, 3]);
        assert.isTrue(typeof val.where === 'function');
        assert.isTrue(typeof val.select === 'function');
        assert.isTrue(typeof val.selectMany === 'function');
        assert.isTrue(typeof val.first === 'function');
        assert.isTrue(typeof val.single === 'function');
    });

    it('should create a linq iterable from object', () => {
        const val = fromObject({ 'a': 1, 'b': 2, 10: 3 });
        assert.isTrue(typeof val.where === 'function');
        assert.isTrue(typeof val.select === 'function');
        assert.isTrue(typeof val.selectMany === 'function');
        assert.isTrue(typeof val.first === 'function');
        assert.isTrue(typeof val.single === 'function');
        const res = val.toArray();
        expect(res).to.deep.equal([['10', 3], ['a', 1], ['b', 2]]);
    });

    it('should create a linq iterable from ArrayLike object', () => {
        const input = {
            0: 'A',
            '1': 'B',
            2: 'C',
            '3': 'D',
            'name': 'E',
            'something': 'F',
            'length': 4
        };
        const seq = fromArrayLike(input).toArray().join(',');
        expect(seq).to.equal('A,B,C,D');
    });

    [
        new Set([0, 1, 2, 3]),
        range(0, 4),
        [0, 1, 2, 3],
        { 0: 0, 1: 1, 2: 2, 3: 3, length: 4 }
    ].forEach((source, indx) => {
        it('should from create a linq iterable from different objects: ' + indx, () => {
            const l = from(source).toArray();
            expect(l).to.deep.equal([0, 1, 2, 3]);
        });
    });

    it('should from create a linq iterable from objects', () => {
        const l = from({ 'a': 0, 'b': 1}).toArray();
        expect(l).to.deep.equal([['a', 0], ['b', 1]]);
    });
});

