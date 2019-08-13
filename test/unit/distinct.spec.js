import { expect } from 'chai';
import { from, fromIterable } from "../../src";
import { Person } from "./models";

describe('distinct tests', () => {
    [
        [1, 2, 3, 1, 5, 2, 'a', 'a'],
        new Set([1, 2, 3, 1, 5, 2, 'a', 'a'])
    ].forEach((source, indx) => {
        it('should return distinct values: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.distinct().toArray()).to.deep.equal([1, 2, 3, 5, 'a']);
        });
    });

    [
        [], new Set()
    ].forEach((source, indx) => {
        it('should return empty when no values: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.distinct().toArray()).to.deep.equal([]);
        });
    });

    [
        [1, 2, 3, 5, 'a', 'b'],
        new Set([1, 2, 3, 5, 'a', 'b'])
    ].forEach((source, indx) => {
        it('should use comparer when provided: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.distinct((a, b) => typeof a === typeof b).toArray()).to.deep.equal([1, 'a']);
        });
    });

    [
        [1, 2, 3, 1, 5, 2, 'a', 'a'],
        new Set([1, 2, 3, 1, 5, 2, 'a', 'a'])
    ].forEach((source, indx) => {
        it('should be able to continue: ' + indx, () => {
            const input = fromIterable(source);
            expect(input.distinct().where(_ => typeof _ === 'string').toArray()).to.deep.equal(['a']);
        });
    });

    it('should do a distinct of object by key', () => {
        const persons = [
            new Person(10, 'A'),
            new Person(20, 'B'),
            new Person(10, 'C'),
            new Person(20, 'D'),
        ];
        const res = from(persons).distinct((a, b) => a.age === b.age).toArray();
        expect(res).to.deep.equals([
            new Person(10, 'A'),
            new Person(20, 'B'),
        ]);
    });
});

