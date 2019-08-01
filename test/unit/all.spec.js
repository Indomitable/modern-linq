import { expect } from 'chai';
import { fromIterable } from "../../src";

describe('all tests', () => {
    it('should return true if all items pass', () => {
        const input = fromIterable(['a', 'b', 'c']);
        expect(input.all(_ => typeof _ === 'string')).to.be.true;
    });

    it('should return false if some items do not pass', () => {
        const input = fromIterable(['a', 'b', 1]);
        expect(input.all(_ => typeof _ === 'string')).to.be.false;
    });

    it('should return true if no items', () => {
        const input = fromIterable([]);
        expect(input.all(_ => typeof _ === 'string')).to.be.true;
    });

    it('should allAndEvery return true if all items pass', () => {
        const input = fromIterable([1, 2, 3, 4, 5]);
        expect(input.allAndEvery(_ => typeof _ === 'number')).to.be.true;
    });

    it('should allAndEvery return false if some items do not pass', () => {
        const input = fromIterable(['a', 'b', 1]);
        expect(input.all(_ => typeof _ === 'string')).to.be.false;
    });

    it('should allAndEvery return false if no items', () => {
        const input = fromIterable([]);
        expect(input.allAndEvery(_ => typeof _ === 'string')).to.be.false;
    });
});
