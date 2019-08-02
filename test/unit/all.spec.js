import { expect } from 'chai';
import { fromIterable } from "../../src";

describe('all tests', () => {
    [
        ['a', 'b', 'c'],
        new Set(['a', 'b', 'c'])
    ].forEach((source, indx) => {
        it('should return true if all items pass: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.all(_ => typeof _ === 'string')).to.be.true;
        });
    });

    [
        ['a', 'b', 1],
        new Set(['a', 'b', 1])
    ].forEach((source, indx) => {
        it('should return false if some items do not pass: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.all(_ => typeof _ === 'string')).to.be.false;
        });
    });

    [
        [],
        new Set()
    ].forEach((source, indx) => {
        it('should return true if no items: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.all(_ => typeof _ === 'string')).to.be.true;
        });
    });

    [
        [1, 2, 3, 4, 5],
        new Set([1, 2, 3, 4, 5])
    ].forEach((source, indx) => {
        it('should allAndEvery return true if all items pass: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.allAndEvery(_ => typeof _ === 'number')).to.be.true;
        });
    });

    [
        ['a', 'b', 1],
        new Set(['a', 'b', 1])
    ].forEach((source, indx) => {
        it('should allAndEvery return false if some items do not pass: ' + indx, () => {
            const input0 = fromIterable(source);
            expect(input0.all(_ => typeof _ === 'string')).to.be.false;
        });
    });

    [
        [],
        new Set()
    ].forEach((source, indx) => {
        it('should allAndEvery return false if no items: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.allAndEvery(_ => typeof _ === 'string')).to.be.false;
        });
    });
});
