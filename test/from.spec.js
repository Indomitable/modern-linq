import { assert, expect } from 'chai';
import { fromIterable, fromObject } from "../src";

describe('from creation tests', () => {
    it('should create a select js iterable from collection', () => {
        const val = fromIterable([1, 2, 3]);
        assert.isTrue(typeof val.where === 'function');
        assert.isTrue(typeof val.select === 'function');
        assert.isTrue(typeof val.selectMany === 'function');
        assert.isTrue(typeof val.first === 'function');
        assert.isTrue(typeof val.single === 'function');
    });

    it('should create a select js iterable from object', () => {
        const val = fromObject({ 'a': 1, 'b': 2, 10: 3 });
        assert.isTrue(typeof val.where === 'function');
        assert.isTrue(typeof val.select === 'function');
        assert.isTrue(typeof val.selectMany === 'function');
        assert.isTrue(typeof val.first === 'function');
        assert.isTrue(typeof val.single === 'function');
        const res = val.toArray();
        expect(res).to.deep.equal([ ['10', 3], ['a', 1], ['b', 2] ]);
    });
});