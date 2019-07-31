import { expect } from 'chai';
import { toSelect } from '../src';

describe('where tests', () => {
    it('should filter collections', () => {
        const source = [1, 2, 3, 4, 5, 6, 7];
        const evenNumbers = toSelect(source).where(_ => _ % 2 === 0);
        expect(Array.from(evenNumbers)).to.deep.equal([2, 4, 6]);
    });

    it('should filter multiple times', () => {
        const source = [1, 2, 3, 4, 5, 6, 7];
        const evenNumbers = toSelect(source).where(_ => _ % 2 === 0).where(_ => _ > 3);
        expect(Array.from(evenNumbers)).to.deep.equal([4, 6]);
    });

    it('should be iteratable multiple times', () => {
        const numbers = toSelect([1, 2, 3, 4, 5, 6, 7]).where(_ => _ % 2 === 0);
        expect(Array.from(numbers)).to.deep.equal([2, 4, 6]);
        expect(Array.from(numbers)).to.deep.equal([2, 4, 6]);
    });
});

