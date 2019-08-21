import { expect } from 'chai';
import { fromIterable, range } from "../../src";

describe('skip while tests', () => {
    [
        [1, 2, 3, 4, 5],
        range(1, 6)
    ].forEach((source, indx) => {
        it('should skip 3 elements: ' + indx, () => {
            const output = fromIterable(source).skipWhile(v => v < 4).toArray();
            expect(output).to.deep.equal([4, 5]);
        });
    });


    [
        [],
        range()
    ].forEach((source, indx) => {
        it('should return empty when source is empty' + indx, () => {
            const output = fromIterable(source).skipWhile(v => v < 4).toArray();
            expect(output).to.deep.equal([]);
        });
    });

    [
        [1, 2, 3, 4, 5],
        range(1, 6)
    ].forEach((source, indx) => {
        it('should return empty when all need to be skipped' + indx, () => {
            const output = fromIterable(source).skipWhile(v => v < 10).toArray();
            expect(output).to.deep.equal([]);
        });
    });


    [
        [1, 2, 3, 4, 5],
        range(1, 6)
    ].forEach((source, indx) => {
        it('should pass index to the condition' + indx, () => {
            const output = fromIterable(source).skipWhile((v, i) => i < 4).toArray();
            expect(output).to.deep.equal([5]);
        });
    });

    it('should able to continue the query', () => {
        const output = range(0, 10).skipWhile(x => x < 7).select(_  => _ * 2).toArray();
        expect(output).to.deep.equal([14, 16, 18]);
    });
});
