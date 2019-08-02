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

    it('should sum throw when no items', () => {
        const res = function() { return fromIterable([]).sum(); };
        expect(res).to.throw(TypeError);
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

    it('should product throw when no items', () => {
        const res = function() { return fromIterable([]).product(); };
        expect(res).to.throw(TypeError);
    });

    it('should get min value', () => {
        // use iterable
        const res0 = range(0, 10).min();
        expect(res0).to.be.equal(0);

        // use array
        const res1 = fromIterable(range(1, 10).toArray()).min();
        expect(res1).to.be.equal(1);
    });

    it('should get min value with comparer', () => {
        const res = fromIterable([ { age: 10}, {age: 5}, {age: 6} ]).min((a, b) => a.age - b.age);
        expect(res).to.deep.equal({ age: 5 });
    });

    it('should min throw when no items', () => {
        const res = function() { return fromIterable([]).min(); };
        expect(res).to.throw(TypeError);
    });

    it('should min equal items', () => {
        const res = fromIterable([ 1, 2, 1 ]).min();
        expect(res).to.be.equal(1);
    });

    it('should get max value', () => {
        // use iterable
        const res0 = range(0, 10).max();
        expect(res0).to.be.equal(9);

        // use array
        const res1 = fromIterable(range(1, 10).toArray()).max();
        expect(res1).to.be.equal(9);
    });

    it('should get max value with comparer', () => {
        const res = fromIterable([ { age: 10}, {age: 5}, {age: 6} ]).max((a, b) => a.age - b.age);
        expect(res).to.deep.equal({ age: 10 });
    });

    it('should max throw when no items', () => {
        const res = function() { return fromIterable([]).max(); };
        expect(res).to.throw(TypeError);
    });

    it('should max equal items', () => {
        const res = fromIterable([ 1, 2, 1, 3, 3 ]).max();
        expect(res).to.be.equal(3);
    });
});

