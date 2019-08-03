import { expect } from 'chai';
import { fromIterable } from "../../src";

describe('select many tests', () => {
    [
        [
            {item: [1, 2, 3, 4]},
            {item: ['a', 'b', 'c', 'd']},
        ],
        new Set([
            {item: [1, 2, 3, 4]},
            {item: ['a', 'b', 'c', 'd']},
        ])
    ].forEach((source, indx) => {
        it('should map iterable: ' + indx, () => {
            const input = fromIterable(source).selectMany(_ => _.item);
            const result = Array.from(input);
            expect(result).to.deep.equal([1, 2, 3, 4, 'a', 'b', 'c', 'd']);
        });
    });

    [
        [
            {item: [1, 2, 3, 4]},
            {item: []},
            {item: []},
            {item: [5, 6, 7]},
            {item: []},
            {item: [8, 9]},
            {item: [10]},
        ],
        new Set([
            {item: [1, 2, 3, 4]},
            {item: []},
            {item: []},
            {item: [5, 6, 7]},
            {item: []},
            {item: [8, 9]},
            {item: [10]},
        ])
    ].forEach((source, indx) => {
        it('should map iterable with empties: ' + indx, () => {
            const input = fromIterable(source).selectMany(_ => _.item);
            const result = Array.from(input);
            expect(result).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        });
    });

    [
        [
            {item: [1, 2, 3, 4]},
            {item: ['a', 'b', 'c', 'd']},
        ],
        new Set([
            {item: [1, 2, 3, 4]},
            {item: ['a', 'b', 'c', 'd']},
        ])
    ].forEach((source, indx) => {
        it('should be possible to continue: ' + indx, () => {
            const input = fromIterable(source).selectMany(_ => _.item).where(i => i === 2).select(_ => _ * 2);
            const result = Array.from(input);
            expect(result).to.deep.equal([4]);
        });
    });
});
