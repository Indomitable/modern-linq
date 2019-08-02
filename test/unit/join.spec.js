import { expect } from 'chai';
import { fromIterable, range } from "../../src";

describe('join tests', () => {
    it('should join sequence', () => {
        // use iterable
        const res0 = range(0, 5).join(',');
        expect(res0).to.be.equal('0,1,2,3,4');

        // use array
        const res1 = fromIterable(range(0, 5).toArray()).join(',');
        expect(res1).to.be.equal('0,1,2,3,4');
    });

    it('should join different types', () => {
        const res = fromIterable([1, 'a', null, {}, undefined, true]).join(',');
        expect(res).to.be.equal('1,a,null,[object Object],undefined,true');
    });

    it('should return empty when done over empty sequence', () => {
        const res = fromIterable([]).join(',');
        expect(res).to.be.equal('');
    });
});
