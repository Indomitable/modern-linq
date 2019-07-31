import { expect } from 'chai';
import { toSelect } from "../src";

describe('select many tests', () => {
    it('should map iterable', () => {
        const source = [
            { item: [1, 2, 3, 4] },
            { item: ['a', 'b', 'c', 'd'] },
        ];
        const input = toSelect(source).selectMany(_ => _.item);
        const result = Array.from(input);
        expect(result).to.deep.equal([1, 2, 3, 4, 'a', 'b', 'c', 'd']);
    });

    it('should be possible to continue', () => {
        const source = [
            { item: [1, 2, 3, 4] },
            { item: ['a', 'b', 'c', 'd'] },
        ];
        const input = toSelect(source).selectMany(_ => _.item).where(i => i === 2).select(_ => _ * 2);
        const result = Array.from(input);
        expect(result).to.deep.equal([4]);
    });

});
