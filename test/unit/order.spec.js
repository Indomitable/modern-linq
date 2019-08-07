import { fromIterable, range } from "../../src";
import { expect } from "chai";

describe('order tests', () => {
    [
        range(100, 0),
        range(100, 0).toArray()
    ].forEach((source, indx) => {
        it('should be order items: ' + indx, () => {
            const result = fromIterable(source).orderBy(_ => _).toArray();
            const expected = range(1, 101).toArray();
            expect(result).to.deep.equal(expected);
        });
    });

    [
        range(0, 100),
        range(0, 100).toArray()
    ].forEach((source, indx) => {
        it('should be order descending items: ' + indx, () => {
            const result = fromIterable(source).orderByDescending(_ => _).toArray();
            const expected = range(99, -1).toArray();
            expect(result).to.deep.equal(expected);
        });
    });

    [
        ['C', 'B', 'A', 'DA', 'D', 'AB'],
        new Set(['C', 'B', 'A', 'DA', 'D', 'AB'])
    ].forEach((source, indx) => {
        it('should able to order string: ' + indx, () => {
            const result = fromIterable(source).orderBy(_ => _).toArray();
            const expected = ['A', 'AB', 'B', 'C', 'D', 'DA']
            expect(result).to.deep.equal(expected);
        });
    });
});

