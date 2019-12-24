import { expect } from 'chai';
import { fromIterable, range } from "../../src/index";

describe('aggregate tests', () => {
    [
        range(0, 10),
        range(0, 10).toArray()
    ].forEach((source, indx) => {
        it('should aggregate collection: ' + indx, () => {
            const res = fromIterable(source).aggregate((a, item) => a + item);
            expect(res).to.be.equal(9 * 10 / 2);
        });
    });

    [
        range(0, 0),
        range(0, 0).toArray()
    ].forEach((source, indx) => {
        it('should throw when not items: ' + indx, () => {
            // use iterable
            const res = function () {
                return fromIterable(source).aggregate((a, item) => a + item);
            };
            expect(res).to.throw(TypeError);
        });
    });

    [
        range(0, 10),
        range(0, 10).toArray()
    ].forEach((source, indx) => {
        it('should aggregate collection with initial value: ' + indx, () => {
            // use iterable
            const res = fromIterable(source).aggregate((a, item) => a + item, 1);
            expect(res).to.be.equal(1 + (9 * 10 / 2));
        });
    });

    [
        range(0, 10),
        range(0, 10).toArray()
    ].forEach((source, indx) => {
        it('should get sum of collection: ' + indx, () => {
            // use iterable
            const res = fromIterable(source).sum();
            expect(res).to.be.equal(9 * 10 / 2);
        });
    });

    it('should sum throw when no items', () => {
        const res = function () {
            return fromIterable([]).sum();
        };
        expect(res).to.throw(TypeError);
    });

    [
        range(1, 10),
        range(1, 10).toArray()
    ].forEach((source, indx) => {
        it('should get product of collection: ' + indx, () => {
            const product = 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9;
            // use iterable
            const res = fromIterable(source).product();
            expect(res).to.be.equal(product);
        });
    });

    it('should product throw when no items', () => {
        const res = function () {
            return fromIterable([]).product();
        };
        expect(res).to.throw(TypeError);
    });

    [
        range(0, 10),
        range(0, 10).toArray()
    ].forEach((source, indx) => {
        it('should get min value: ' + indx, () => {
            // use iterable
            const res = fromIterable(source).min();
            expect(res).to.be.equal(0);
        });
    });

    it('should get min value with comparer', () => {
        const res = fromIterable([{ age: 10 }, { age: 5 }, { age: 6 }]).min((a, b) => a.age - b.age);
        expect(res).to.deep.equal({ age: 5 });
    });

    it('should min throw when no items', () => {
        const res = function () {
            return fromIterable([]).min();
        };
        expect(res).to.throw(TypeError);
    });

    it('should min equal items', () => {
        const res = fromIterable([1, 2, 1]).min();
        expect(res).to.be.equal(1);
    });

    [
        range(0, 10),
        range(0, 10).toArray()
    ].forEach((source, indx) => {
        it('should get max value: ' + indx, () => {
            // use iterable
            const res = fromIterable(source).max();
            expect(res).to.be.equal(9);
        });
    });

    it('should get max value with comparer', () => {
        const res = fromIterable([{ age: 10 }, { age: 5 }, { age: 6 }]).max((a, b) => a.age - b.age);
        expect(res).to.deep.equal({ age: 10 });
    });

    it('should max throw when no items', () => {
        const res = function () {
            return fromIterable([]).max();
        };
        expect(res).to.throw(TypeError);
    });

    it('should max equal items', () => {
        const res = fromIterable([1, 2, 1, 3, 3]).max();
        expect(res).to.be.equal(3);
    });
});

