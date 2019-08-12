import { expect } from 'chai';
import { from } from "../../src";
import { Person } from "./models";

describe('is equal tests', () => {
    [
        [1, 2, 3, 1, 5, 2, 'a', 'a'],
        new Set([1, 2, 3, 1, 5, 2, 'a', 'a'])
    ].forEach((source, indx) => {
        it('should be equal to self' + indx, () => {
            const input = from(source).isEqual(source);
            expect(input).to.be.true;
        });
    });

    it('should be not equal', () => {
        expect(from([0, 1]).isEqual([0])).to.be.false;
        expect(from([0, 1]).isEqual([0, 1, 2])).to.be.false;
        expect(from([0, 1, 3]).isEqual([0, 1, 2])).to.be.false;
        expect(from([0, 1]).isEqual(['a', 'b'])).to.be.false;
        expect(from([
            new Person(10, 'a'),
            new Person(20, 'b')
        ]).isEqual([
            new Person(10, 'a'),
            new Person(20, 'b'),
            (a, b) => a.age === b.age
        ])).to.be.false;
    });

    it('should be equal', () => {
        expect(from([]).isEqual([])).to.be.true;
        expect(from([1, 2]).isEqual([2, 4], (a, b) => (a * 2) === b )).to.be.true;

        expect(from([new Person(10, 'a'), new Person(20, 'b')])
            .isEqual(from([new Person(10, 'c'), new Person(20, 'd')]), (a, b) => a.age === b.age)).to.be.true;
    });
});
