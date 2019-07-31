import { expect } from 'chai';
import { toSelect } from "../src";

describe('select tests', () => {
    it('should map iterable', () => {
        const input = toSelect(['a', 'b', 'c', 'd']).select(_ => _ + 'a');
        const result = Array.from(input);
        expect(result).to.deep.equal(['aa', 'ba', 'ca', 'da']);
    });

    it('should map after filter', () => {
        const input = toSelect(['a', 'b', 'c', 'd']).where(_ => _ !== 'a').select(_ => _ + 'a');
        const result = Array.from(input);
        expect(result).to.deep.equal(['ba', 'ca', 'da']);
    });

    it('should be iteratable multiple times', () => {
        const numbers = toSelect([1, 2, 3, 4, 5, 6, 7]).select(_ => _ * 2);
        expect(Array.from(numbers)).to.deep.equal([ 2, 4, 6, 8, 10, 12, 14 ]);
        expect(Array.from(numbers)).to.deep.equal([ 2, 4, 6, 8, 10, 12, 14 ]);
    });
});
