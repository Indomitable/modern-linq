import { expect } from 'chai';
import { fromIterable, range } from "../../src";

describe('take while tests', () => {
    [
        [1, 2, 3, 4, 5],
        range(1, 6)
    ].forEach((source, indx) => {
        it('should take first 2 elements: ' + indx, () => {
            const output = fromIterable(source).takeWhile(v => v < 3).toArray();
            expect(output).to.deep.equal([1, 2]);
        });
    });


    [
        [],
        range()
    ].forEach((source, indx) => {
        it('should return empty when source is empty' + indx, () => {
            const output = fromIterable(source).takeWhile(v => v < 4).toArray();
            expect(output).to.deep.equal([]);
        });
    });

    [
        [1, 2, 3, 4, 5],
        range(1, 6)
    ].forEach((source, indx) => {
        it('should return empty when none to be taken' + indx, () => {
            const output = fromIterable(source).takeWhile(v => v > 10).toArray();
            expect(output).to.deep.equal([]);
        });
    });


    [
        [1, 2, 3, 4, 5],
        range(1, 6)
    ].forEach((source, indx) => {
        it('should pass index to the condition' + indx, () => {
            const output = fromIterable(source).takeWhile((v, i) => i < 2).toArray();
            expect(output).to.deep.equal([1, 2]);
        });
    });

    it('should able to continue the query', () => {
        const output = range(0, 10).takeWhile(x => x < 3).select(_  => _ * 2).toArray();
        expect(output).to.deep.equal([0, 2, 4])
    });
});
