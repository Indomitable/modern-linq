import { expect } from 'chai';
import { from, range } from "../../src";

describe('union tests', () => {
    [
        { first: range(0, 10), second: range(0, 10) },
        { first: range(0, 10).toArray(), second: range(0, 10).toArray() },
    ].forEach((source, indx) => {
        it('should union make a set iterable from both iterables: ' + indx, () => {
            const res = from(source.first).union(source.second).toArray();
            expect(res).to.deep.equal(range(0, 10).toArray());
        });
    });

    [
        { first: new Set(['a', 'b', 'c']), second: new Set(['b', 'd']) },
        { first: Array.from(new Set(['a', 'b', 'c'])), second: new Set(['b', 'd']) }
    ].forEach((source, indx) => {
        it('should union make a set iterable from both strings iterables: ' + indx, () => {
            const res = from(source.first).union(source.second).toArray();
            expect(res).to.deep.equal(['a', 'b', 'c', 'd']);
        });
    });

    it('should work with strings', () => {
        const res = from('abcdefg').union('abcjkf').join('');
        expect(res).to.deep.equal('abcdefgjk')
    });
});
