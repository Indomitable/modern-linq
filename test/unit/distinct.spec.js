import { expect } from 'chai';
import { fromIterable } from "../../src";

describe('distinct tests', () => {
    it('should return distinct values', () => {
        const input = fromIterable([1, 2, 3, 1, 5, 2, 'a', 'a']);
        expect(input.distinct().toArray()).to.deep.equal([1, 2, 3, 5, 'a']);
    });

    it('should return empty when no values', () => {
        const input = fromIterable([]);
        expect(input.distinct().toArray()).to.deep.equal([]);
    });

    it('should use comparer when provided', () => {
        const input = fromIterable([1, 2, 3, 5, 'a', 'b']);
        expect(input.distinct((a, b) => typeof a === typeof b).toArray()).to.deep.equal([1, 'a']);
    });

    it('should be able to continue', () => {
        const input = fromIterable([1, 2, 3, 1, 5, 2, 'a', 'a']);
        expect(input.distinct().where(_ => typeof _ === 'string').toArray()).to.deep.equal(['a']);
    });
});

