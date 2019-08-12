import { expect } from 'chai';
import { range, repeat } from "../../src";

describe('repeat generator tests', () => {
   it('should repeat numbers', () => {
       const res = repeat(1, 5).toArray();
       expect(res).to.deep.equal([1, 1, 1, 1, 1]);
   });

    it('should repeat strings', () => {
        const res = repeat('b', 5).toArray();
        expect(res).to.deep.equal(range(0, 5).select(_ => ('b')).toArray());
    });

    it('should repeat bool', () => {
        const res = repeat(true, 10).toArray();
        expect(res).to.deep.equal(range(0, 10).select(_ => (true)).toArray());
    });
});
