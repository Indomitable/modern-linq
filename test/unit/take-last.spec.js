import { expect } from 'chai';
import { from, range } from "../../src";

describe('take last tests', () => {
    [
        [1, 2, 3, 4, 5],
        range(1, 6)
    ].forEach((source, indx) => {
        it('should take last 2 elements: ' + indx, () => {
            const output = from(source).takeLast(2).toArray();
            expect(output).to.deep.equal([4, 5]);
        });
    });


    [
        [],
        range()
    ].forEach((source, indx) => {
        it('should return empty when source is empty' + indx, () => {
            const output = from(source).takeLast(3).toArray();
            expect(output).to.deep.equal([]);
        });
    });

    [
        [1, 2, 3, 4, 5],
        range(1, 6)
    ].forEach((source, indx) => {
        it('should return empty when none to be taken' + indx, () => {
            expect(from(source).takeLast(0).toArray()).to.deep.equal([]);
            expect(from(source).takeLast(-1).toArray()).to.deep.equal([]);
        });
    });


    it('should able to continue the query', () => {
        const output = range(0, 10).takeLast(3).select(_  => _ * 2).toArray();
        expect(output).to.deep.equal([14, 16, 18])
    });
});
