import { expect } from 'chai';
import { fromIterable } from '../../src';

describe('where tests', () => {
    [
        [1, 2, 3, 4, 5, 6, 7],
        new Set([1, 2, 3, 4, 5, 6, 7])
    ].forEach((source, indx) => {
        it('should filter collections: ' + indx, () => {
            const evenNumbers = fromIterable(source).where(_ => _ % 2 === 0);
            expect(Array.from(evenNumbers)).to.deep.equal([2, 4, 6]);
        });
    });

    [
        [1, 2, 3, 4, 5, 6, 7],
        new Set([1, 2, 3, 4, 5, 6, 7])
    ].forEach((source, indx) => {
        it('should filter multiple times: ' + indx, () => {
            const evenNumbers = fromIterable(source).where(_ => _ % 2 === 0).where(_ => _ > 3);
            expect(Array.from(evenNumbers)).to.deep.equal([4, 6]);
        });
    });

    [
        [1, 2, 3, 4, 5, 6, 7],
        new Set([1, 2, 3, 4, 5, 6, 7])
    ].forEach((source, indx) => {
        it('should be iteratable multiple times: ' + indx, () => {
            const numbers = fromIterable(source).where(_ => _ % 2 === 0);
            expect(Array.from(numbers)).to.deep.equal([2, 4, 6]);
            expect(Array.from(numbers)).to.deep.equal([2, 4, 6]);
        });
    });
});

