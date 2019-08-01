import { expect } from 'chai';
import { range } from "../src";

describe('range tests', () => {
    it ('should generate a range', () => {
        const output = range(0, 5).toArray();
        expect(output).to.deep.equal([0, 1, 2, 3, 4]);
    });

    it ('should be able to continue with another operation', () => {
        const output = range(0, 5).skip(2).toArray();
        expect(output).to.deep.equal([2, 3, 4]);
    });

    it ('should generate decreasing range when from bigger than to', () => {
        const output = range(5, 0).toArray();
        expect(output).to.deep.equal([5, 4, 3, 2, 1]);
    });

    it ('should return empty when from === to', () => {
        const output = range(5, 5).toArray();
        expect(output).to.deep.equal([]);
    });
});
