import { expect } from 'chai';
import { from, range } from "../../src";

describe('skip last tests', () => {
    [
        [1, 2, 3, 4, 5],
        range(1, 6)
    ].forEach((source, indx) => {
        it('should skip last n numbers: ' + indx, () => {
            const output = from(source).skipLast(2).toArray();
            expect(output).to.deep.equal([1, 2, 3]);
        });
    });

    [
        [1, 2, 3, 4, 5],
        range(1, 6)
    ].forEach((source, indx) => {
        it('should skip last n numbers after another operation: ' + indx, () => {
            const output = from(source).where(_ => _ > 2).skipLast(2).toArray();
            expect(output).to.deep.equal([3]);
        });
    });

    [
        [1, 2, 3, 4, 5],
        range(1, 6)
    ].forEach((source, indx) => {
        it('should skip be able to continue with another operator: ' + indx, () => {
            const output = from(source)
                .where(_ => _ > 2)
                .skipLast(1)
                .select(x => `item_${x}`)
                .toArray();
            expect(output).to.deep.equal(['item_3', 'item_4']);
        });
    });

    [
        [1, 2],
        range(1, 3)
    ].forEach((source, indx) => {
        it('should skip return nothing if count is less: ' + indx, () => {
            // use array
            const res = from(source)
                .skipLast(3)
                .toArray();
            expect(res).to.deep.equal([]);
        });
    });

    [
        [],
        new Set()
    ].forEach((source, indx) => {
        it('should skip return empty from empty collection: ' + indx, () => {
            const output = from(source)
                .skipLast(2)
                .toArray();
            expect(output).to.deep.equal([]);
        });
    });

    [
        [1, 2, 3, 4, 5],
        range(1, 6)
    ].forEach((source, indx) => {
        it('should return all when none to be skipped' + indx, () => {
            expect(from(source).skipLast(0).toArray()).to.deep.equal([1, 2, 3, 4, 5]);
            expect(from(source).skipLast(-1).toArray()).to.deep.equal([1, 2, 3, 4, 5]);
        });
    });
});
