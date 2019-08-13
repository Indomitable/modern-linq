import { expect } from 'chai';
import { from, fromIterable } from "../../src";

describe('select many tests', () => {
    [
        [
            {item: [1, 2, 3, 4]},
            {item: ['a', 'b', 'c', 'd']},
        ],
        new Set([
            {item: [1, 2, 3, 4]},
            {item: ['a', 'b', 'c', 'd']},
        ])
    ].forEach((source, indx) => {
        it('should map iterable: ' + indx, () => {
            const resSelectMany = fromIterable(source)
                .selectMany(_ => _.item)
                .toArray();
            expect(resSelectMany).to.deep.equal([1, 2, 3, 4, 'a', 'b', 'c', 'd']);
            const resFlat = from(source).flat(_ => _.item).toArray();
            const flatResExpected = [];
            for (const outer of source) {
                for (const inner of outer.item) {
                    flatResExpected.push({ outer, inner });
                }
            }
            expect(resFlat).to.deep.equal(flatResExpected);
        });
    });

    [
        [
            {item: [1, 2, 3, 4]},
            {item: []},
            {item: []},
            {item: [5, 6, 7]},
            {item: []},
            {item: [8, 9]},
            {item: [10]},
        ],
        new Set([
            {item: [1, 2, 3, 4]},
            {item: []},
            {item: []},
            {item: [5, 6, 7]},
            {item: []},
            {item: [8, 9]},
            {item: [10]},
        ])
    ].forEach((source, indx) => {
        it('should map iterable with empties: ' + indx, () => {
            const resultSelectMany = fromIterable(source).selectMany(_ => _.item).toArray();
            expect(resultSelectMany).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

            const resFlat = from(source).flat(_ => _.item).toArray();
            const flatResExpected = [];
            for (const outer of source) {
                for (const inner of outer.item) {
                    flatResExpected.push({ outer, inner });
                }
            }
            expect(resFlat).to.deep.equal(flatResExpected);
            expect(resFlat.length).to.deep.equal(resultSelectMany.length);
        });
    });

    [
        [
            {item: [1, 2, 3, 4]},
            {item: ['a', 'b', 'c', 'd']},
        ],
        new Set([
            {item: [1, 2, 3, 4]},
            {item: ['a', 'b', 'c', 'd']},
        ])
    ].forEach((source, indx) => {
        it('should be possible to continue: ' + indx, () => {
            const resultSelectMany = fromIterable(source).selectMany(_ => _.item).where(i => i === 2).select(_ => _ * 2).toArray();
            expect(resultSelectMany).to.deep.equal([4]);

            const resultFlat = fromIterable(source).flat(_ => _.item).where(i => i.inner === 2).select(_ => _.inner * 2).toArray();
            expect(resultFlat).to.deep.equal(resultSelectMany);
        });
    });
});
