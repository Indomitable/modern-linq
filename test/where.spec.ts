import { expect } from 'chai';
import { toSelect } from '../src';

describe('where tests', () => {
    it('should filter collections', () => {
        const source = [1, 2, 3, 4, 5, 6, 7];
        const evenNumbers = toSelect(source).where(_ => _ % 2 === 0);
        console.log(Array.from(evenNumbers));
        expect(Array.from(evenNumbers)).to.deep.equal([2, 4, 6]);
    });

    it('should filter multiple times collections', () => {
        const source = [1, 2, 3, 4, 5, 6, 7];
        const evenNumbers = toSelect(source).where(_ => _ % 2 === 0).where(_ => _ > 3);
        console.log(Array.from(evenNumbers));
        expect(Array.from(evenNumbers)).to.deep.equal([4, 6]);
    });
});

