import { expect } from 'chai';
import { fromIterable } from "../../src";

describe('distinct tests', () => {
    [
        [1, 2, 3, 1, 5, 2, 'a', 'a'],
        new Set([1, 2, 3, 1, 5, 2, 'a', 'a'])
    ].forEach((source, indx) => {
        it('should return distinct values: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.distinct().toArray()).to.deep.equal([1, 2, 3, 5, 'a']);
        });
    });

    [
        [], new Set()
    ].forEach((source, indx) => {
        it('should return empty when no values: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.distinct().toArray()).to.deep.equal([]);
        });
    });

    [
        [1, 2, 3, 5, 'a', 'b'],
        new Set([1, 2, 3, 5, 'a', 'b'])
    ].forEach((source, indx) => {
        it('should use comparer when provided: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.distinct((a, b) => typeof a === typeof b).toArray()).to.deep.equal([1, 'a']);
        });
    });

    [
        [1, 2, 3, 1, 5, 2, 'a', 'a'],
        new Set([1, 2, 3, 1, 5, 2, 'a', 'a'])
    ].forEach((source, indx) => {
        it('should be able to continue: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.distinct().where(_ => typeof _ === 'string').toArray()).to.deep.equal(['a']);
        });
    });
});

