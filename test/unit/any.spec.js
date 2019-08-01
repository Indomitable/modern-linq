import { expect } from 'chai';
import { fromIterable } from "../../src";

describe('any tests', () => {
    it('should return true if at least one item pass', () => {
        const input = fromIterable(['a', 1, 'c']);
        expect(input.any(_ => typeof _ === 'number')).to.be.true;
    });

    it('should return false if no items', () => {
        const input = fromIterable([]);
        expect(input.any(_ => typeof _ === 'string')).to.be.false;
    });

    it('should return false if no items pass', () => {
        const input = fromIterable([1, 2, 3]);
        expect(input.any(_ => typeof _ === 'string')).to.be.false;
    });
});
