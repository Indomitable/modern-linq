import { expect } from 'chai';
import { fromIterable } from "../../src";

describe('first finalizer', () => {
    it('should return first value', () => {
        const val = fromIterable([1, 2, 3, 4, 5]).where(_ => _ % 2 !== 0).select(_ => _ * 2).first();
        expect(val).to.equal(2);
    });

    it('should return undefined if no value', () => {
        const val = fromIterable([1, 2, 3, 4, 5]).where(_ => _ > 5).first();
        expect(val).to.be.undefined;
    });


    it('should firstOrDefault return first value', () => {
        const val = fromIterable([1, 2]).firstOrDefault(9);
        expect(val).to.equal(1);
    });

    it('should firstOrDefault return default if no value', () => {
        const val = fromIterable([1, 2, 3, 4, 5]).where(_ => _ > 5).firstOrDefault(9);
        expect(val).to.equal(9);
    });
});
