import { expect } from 'chai';
import { from, fromIterable } from "../../src";

describe('any tests', () => {
    [
        ['a', 1, 'c'],
        new Set(['a', 1, 'c'])
    ].forEach((source, indx) => {
        it('should return true if at least one item pass: ' + indx, () => {
            const res = fromIterable(source).any(_ => typeof _ === 'number');
            expect(res).to.be.true;
        });
    });

    [
        [],
        new Set()
    ].forEach((source, indx) => {
        it('should return false if no items: ' + indx, () => {
            const res = fromIterable(source).any(_ => typeof _ === 'string');
            expect(res).to.be.false;
        });
    });

    [
        [1, 2, 3],
        new Set([1, 2, 3])
    ].forEach((source, indx) => {
        it('should return false if no items pass: ' + indx, () => {
            const res = fromIterable(source).any(_ => typeof _ === 'string');
            expect(res).to.be.false;
        });
    });

    it('should any check if elements', () => {
        expect(from([1]).any()).to.be.true;
        expect(from([]).any()).to.be.false;
        expect(from(new Set([1])).any()).to.be.true;
        expect(from(new Set()).any()).to.be.false;
    });
});
