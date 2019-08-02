import { expect } from 'chai';
import { fromIterable, range } from "../../src";

describe('count tests', () => {

    it('should give number of elements', () => {
        expect(fromIterable([1, 2, 3]).count()).to.equal(3);
        expect(range(0, 10).count()).to.equal(10);
    });

    it('should give number of elements which satisfy predicate', () => {
        expect(fromIterable([1, 2, 3]).count(_ => _ % 2 === 0)).to.equal(1);
        expect(range(0, 10).count(_ => _ % 2 === 0)).to.equal(5);
    });
});
