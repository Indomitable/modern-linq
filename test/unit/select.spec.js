import { expect } from 'chai';
import { fromIterable } from "../../src";

describe('select tests', () => {
    it('should map iterable', () => {
        const input = fromIterable(['a', 'b', 'c', 'd']).select(_ => _ + 'a');
        const result = Array.from(input);
        expect(result).to.deep.equal(['aa', 'ba', 'ca', 'da']);
    });

    it('should map after filter', () => {
        const input = fromIterable(['a', 'b', 'c', 'd']).where(_ => _ !== 'a').select(_ => _ + 'a');
        const result = Array.from(input);
        expect(result).to.deep.equal(['ba', 'ca', 'da']);
    });

    it('should be able to continue', () => {
        const result = fromIterable(['a', 'b', 'c', 'd']).select(_ => _ + 'a').select(_ => 'b' + _).toArray();
        expect(result).to.deep.equal(['baa', 'bba', 'bca', 'bda']);
    });

    it('should be iteratable multiple times', () => {
        const numbers = fromIterable([1, 2, 3, 4, 5, 6, 7]).select(_ => _ * 2);
        expect(Array.from(numbers)).to.deep.equal([ 2, 4, 6, 8, 10, 12, 14 ]);
        expect(Array.from(numbers)).to.deep.equal([ 2, 4, 6, 8, 10, 12, 14 ]);
    });
});
