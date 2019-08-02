import { expect } from 'chai';
import { fromIterable, range } from "../../src";

describe('join tests', () => {
    [
        range(0, 5),
        range(0, 5).toArray()
    ].forEach((source, indx) => {
        it('should join sequence: ' + indx, () => {
            // use iterable
            const res0 = fromIterable(source).join(',');
            expect(res0).to.be.equal('0,1,2,3,4');
        });
    });

    [
        [1, 'a', null, {}, undefined, true],
        new Set([1, 'a', null, {}, undefined, true])
    ].forEach((source, indx) => {
        it('should join different types: ' + indx, () => {
            const res = fromIterable(source).join(',');
            expect(res).to.be.equal('1,a,null,[object Object],undefined,true');
        });
    });

    it('should return empty when done over empty sequence', () => {
        const res = fromIterable([]).join(',');
        expect(res).to.be.equal('');
    });
});
