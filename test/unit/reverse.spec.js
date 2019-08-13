import { expect } from 'chai';
import { from, fromIterable, range } from "../../src";

describe('reverse tests', () => {
    [
        ['a', 'b', 'c', 'd'],
        new Set(['a', 'b', 'c', 'd'])
    ].forEach((source, indx) => {
        it('should reverse string sequence: ' + indx, () => {
            const res = from(source).reverse().toArray();
            expect(res).to.deep.equals(['d', 'c', 'b', 'a']);
        });
    });

    [
        range(0, 100).toArray(),
        range(0, 100)
    ].forEach((source, indx) => {
        it('should reverse string sequence: ' + indx, () => {
            const res = from(source).reverse().toArray();
            expect(res).to.deep.equals(range(99, -1).toArray());
        });
    });

    it('should reverse on empty return empty', () => {
        const res = from([]).reverse().toArray();
        expect(res).to.deep.equals([]);
    });
});
