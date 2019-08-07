import { expect } from 'chai';
import { fromIterable, range } from "../../src";

describe('output tests', () => {
    it('should create an array', () => {
        const array = fromIterable([1, 2, 3, 4, 5]).where(_ => _ < 3).toArray();
        expect(Array.isArray(array)).to.be.true;
        expect(array).to.deep.equal([1, 2]);
    });

    it('should create a map with value transform', () => {
        const map = fromIterable([
            { id: 1, value: 'A' },
            { id: 2, value: 'B' },
            { id: 3, value: 'C' },
            { id: 4, value: 'D' },
        ]).toMap(_ => _.id, _ => _.value);

        expect(Array.from(map.entries())).to.deep.equal([
            [1, 'A'],
            [2, 'B'],
            [3, 'C'],
            [4, 'D'],
        ]);
    });

    it('should create a map', () => {
        const map = fromIterable([
            { id: 1, value: 'A' },
            { id: 2, value: 'B' },
            { id: 3, value: 'C' },
            { id: 4, value: 'D' },
        ]).toMap(_ => _.id);

        expect(Array.from(map.entries())).to.deep.equal([
            [1, { id: 1, value: 'A' }],
            [2, { id: 2, value: 'B' }],
            [3, { id: 3, value: 'C' }],
            [4, { id: 4, value: 'D' }],
        ]);
    });


    it('should create a set', () => {
        const set = fromIterable([1, 2, 3, 1, 2, 3]).toSet();
        expect(Array.from(set.values())).to.deep.equal([1, 2, 3]);
    });

    [
        range(0, 10),
        range(0, 10).toArray(),
    ].forEach((source, indx) => {
        it('to array should map elements if map function is provided: ' + indx, () => {
            const iterable = fromIterable(source);
            const arr = iterable.toArray(_ => _ * 2);
            let i = 0;
            for (const item of range(0, 10)) {
                expect(arr[i]).to.equal(item * 2);
                i++;
            }
        });
    });
});

