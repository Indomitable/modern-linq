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
});
