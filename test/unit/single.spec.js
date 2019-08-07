import {expect} from 'chai';
import {fromIterable, range} from "../../src";

describe('single finalizer', () => {
    [
        range(0, 6),
        range(0, 6).toArray()
    ].forEach((source, indx) => {
        it('should return single value: ' + indx, () => {
            const val = fromIterable(source).where(_ => _ === 3).single();
            expect(val).to.equal(3);
        });
    });

    [
        range(0, 6),
        range(0, 6).toArray()
    ].forEach((source, indx) => {
        it('should return single value with predicate: ' + indx, () => {
            const val = fromIterable(source).single(x => x === 3);
            expect(val).to.equal(3);
        });
    });

    [
        range(0, 6),
        range(0, 6).toArray()
    ].forEach((source, indx) => {
        it('should throw exception if no values: ' + indx, () => {
            const val = function () {
                return fromIterable(source).where(_ => _ === 9).single();
            };
            expect(val).to.throw(TypeError);
        });
    });

    [
        range(0, 6),
        range(0, 6).toArray()
    ].forEach((source, indx) => {
        it('should throw exception if no values with predicate: ' + indx, () => {
            const val = function () {
                return fromIterable(source).single(_ => _ === 9);
            };
            expect(val).to.throw(TypeError);
        });
    });

    [
        range(0, 6),
        range(0, 6).toArray()
    ].forEach((source, indx) => {
        it('should throw exception if multiple values: ' + indx, () => {
            const val = function () {
                return fromIterable(source).where(_ => _ === 1 || _ === 2).single();
            };
            expect(val).to.throw(TypeError);
        });
    });

    [
        range(0, 6),
        range(0, 6).toArray()
    ].forEach((source, indx) => {
        it('should throw exception if multiple values with predicate: ' + indx, () => {
            const val = function () {
                return fromIterable(source).single(_ => _ === 1 || _ === 2);
            };
            expect(val).to.throw(TypeError);
        });
    });

    [
        range(0, 1),
        range(0, 1).toArray()
    ].forEach((source, indx) => {
        it('should singleOrDefault return first value: ' + indx, () => {
            const val = fromIterable(source).singleOrDefault(9);
            expect(val).to.equal(0);
        });
    });

    [
        range(0, 6),
        range(0, 6).toArray()
    ].forEach((source, indx) => {
        it('should singleOrDefault return first value with predicate: ' + indx, () => {
            const val = fromIterable(source).singleOrDefault(9, _ => _ === 2);
            expect(val).to.equal(2);
        });
    });

    [
        range(0, 6),
        range(0, 6).toArray()
    ].forEach((source, indx) => {
        it('should singleOrDefault return default if no value: ' + indx, () => {
            const val = fromIterable(source).where(_ => _ > 5).singleOrDefault(9);
            expect(val).to.equal(9);
        });
    });

    [
        range(0, 6),
        range(0, 6).toArray()
    ].forEach((source, indx) => {
        it('should singleOrDefault return default if no value with predicate: ' + indx, () => {
            const val = fromIterable(source).singleOrDefault(9, _ => _ > 5);
            expect(val).to.equal(9);
        });
    });

    [
        range(0, 6),
        range(0, 6).toArray()
    ].forEach((source, indx) => {
        it('should singleOrDefault throw if multiple values: ' + indx, () => {
            const val = function () {
                return fromIterable(source).where(_ => _ > 2).singleOrDefault(9);
            };
            expect(val).to.throw(TypeError);
        });
    });

    [
        range(0, 6),
        range(0, 6).toArray()
    ].forEach((source, indx) => {
        it('should singleOrDefault throw if multiple values with predicate: ' + indx, () => {
            const val = function () {
                return fromIterable(source).singleOrDefault(9, _ => _ > 2);
            };
            expect(val).to.throw(TypeError);
        });
    });
});
