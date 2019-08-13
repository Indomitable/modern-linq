import { expect } from 'chai';
import { from, range } from "../../src";

describe('page iteration tests', () => {
    [
        range(0, 105),
        Array.from(range(0, 105))
    ].forEach((source, indx) => {
        it('should page iterable: ' + indx, () => {
            const res = from(source).page(20).toArray();
            expect(res.length).to.equal(6);
            expect(res).to.deep.equals([
                Array.from(range(0, 20)),
                Array.from(range(20, 40)),
                Array.from(range(40, 60)),
                Array.from(range(60, 80)),
                Array.from(range(80, 100)),
                Array.from(range(100, 105)),
            ])
        })
    });

    it('should page string', () => {
        const res = from('abcdefd').page(3)
            .groupBy((arr, i) => i, _ => _, (key, items) => items.first().join(''))
            .join(',');
        expect(res).to.equal('abc,def,d');
    });

    it('should page when mod pageSize === 0', () => {
        const res0 = from(range(0, 20)).page(5).toArray();
        expect(res0.length).to.equal(4);
        const res1 = from('abcdef').page(3).toArray();
        expect(res1.length).to.equal(2);
    });
});
