import { expect } from 'chai';
import { fromIterable } from "../../src";

describe('select many tests', () => {
    it('should map iterable', () => {
        const source = [
            { item: [1, 2, 3, 4] },
            { item: ['a', 'b', 'c', 'd'] },
        ];
        const input = fromIterable(source).selectMany(_ => _.item);
        const result = Array.from(input);
        expect(result).to.deep.equal([1, 2, 3, 4, 'a', 'b', 'c', 'd']);
    });

    it('should map iterable with empties', () => {
        const source = [
            { item: [1, 2, 3, 4] },
            { item: [] },
            { item: [] },
            { item: [5, 6, 7] },
            { item: [] },
            { item: [8, 9] },
            { item: [10] },
        ];
        const input = fromIterable(source).selectMany(_ => _.item);
        const result = Array.from(input);
        expect(result).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('should be possible to continue', () => {
        const source = [
            { item: [1, 2, 3, 4] },
            { item: ['a', 'b', 'c', 'd'] },
        ];
        const input = fromIterable(source).selectMany(_ => _.item).where(i => i === 2).select(_ => _ * 2);
        const result = Array.from(input);
        expect(result).to.deep.equal([4]);
    });

});
