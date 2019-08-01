import { expect } from 'chai';
import { fromIterable } from "../src";

describe('single finalizer', () => {
    it('should return single value', () => {
        const val = fromIterable([1, 2, 3, 4, 5]).where(_ => _ === 3).single();
        expect(val).to.equal(3);
    });

    it('should throw exception if no values', () => {
        const val = function () { return  fromIterable([1, 2, 3, 4, 5]).where(_ => _ === 9).single(); };
        expect(val).to.throw(RangeError, 'Sequence does not contain single item');
    });

    it('should throw exception if multiple values', () => {
        const val = function () { return  fromIterable([1, 2, 3, 4, 5]).where(_ => _ === 1 || _ === 2).single(); };
        expect(val).to.throw(RangeError, 'Sequence does not contain single item');
    });

    it('should singleOrDefault return first value', () => {
        const val = fromIterable([1]).singleOrDefault(9);
        expect(val).to.equal(1);
    });

    it('should singleOrDefault return default if no value', () => {
        const val = fromIterable([1, 2, 3, 4, 5]).where(_ => _ > 5).singleOrDefault(9);
        expect(val).to.equal(9);
    });

    it('should singleOrDefault throw if multiple values ', () => {
        const val = function () { return fromIterable([1, 2, 3, 4, 5]).where(_ => _ > 2).singleOrDefault(9); };
        expect(val).to.throw(RangeError, 'Sequence contains multiple items');
    });

});
