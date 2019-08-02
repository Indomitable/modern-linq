import { expect } from 'chai';
import { fromIterable, range } from "../../src";

describe('aggregate tests', () => {
    it('should aggregate collection', () => {
        // use iterable
        const res0 = range(0, 10).aggregate((a, item) => a + item);
        expect(res0).to.be.equal(9 * 10 / 2);

        // use array
        const res1 = fromIterable(range(0, 10).toArray()).aggregate((a, item) => a + item);
        expect(res1).to.be.equal(9 * 10 / 2);
    });

    it('should throw when not items', () => {
        // use iterable
        const res0 = function () {
            return range(0, 0).aggregate((a, item) => a + item);
        };
        expect(res0).to.throw(TypeError);

        // use array
        const res1 = function () {
            return fromIterable([]).aggregate((a, item) => a + item);
        };
        expect(res1).to.throw(TypeError);
    });

    it('should aggregate collection with initial value', () => {
        // use iterable
        const res0 = range(0, 10).aggregate((a, item) => a + item, 1);
        expect(res0).to.be.equal(1 + (9 * 10 / 2));

        // use array
        const res1 = fromIterable(range(0, 10).toArray()).aggregate((a, item) => a + item, 1);
        expect(res1).to.be.equal(1 + (9 * 10 / 2));
    });

    it('should get sum of collection', () => {
        // use iterable
        const res0 = range(0, 10).sum();
        expect(res0).to.be.equal(9 * 10 / 2);

        // use array
        const res1 = fromIterable(range(0, 10).toArray()).sum();
        expect(res1).to.be.equal(9 * 10 / 2);
    });

    it('should get product of collection', () => {
        const product = 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9;
        // use iterable
        const res0 = range(1, 10).product();
        expect(res0).to.be.equal(product);

        // use array
        const res1 = fromIterable(range(1, 10).toArray()).product();
        expect(res1).to.be.equal(product);
    });
});

