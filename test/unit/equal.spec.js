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
        ])).to.be.false;
    });

    it('should be equal', () => {
        expect(from([]).isEqual([])).to.be.true;
        expect(from([1, 2]).isEqual([2, 4], (a, b) => (a * 2) === b)).to.be.true;

        expect(from([new Person(10, 'a'), new Person(20, 'b')])
            .isEqual(from([new Person(10, 'c'), new Person(20, 'd')]), (a, b) => a.age === b.age)).to.be.true;
    });

    it('should be element equal', () => {
        expect(from([1, 2, 3]).isElementsEqual([3, 2, 1])).to.be.true;
        expect(from([]).isElementsEqual([])).to.be.true;
        expect(from([1, 2, 3, 3]).isElementsEqual([3, 2, 1, 3])).to.be.true;
        expect(from([1, 2, 3]).isElementsEqual([3, 2, 1, 3])).to.be.false;
        expect(from([1, 2, 3, 3]).isElementsEqual([2, 1, 3])).to.be.false;

        expect(from([1]).isElementsEqual([])).to.be.false;
        expect(from([]).isElementsEqual([1])).to.be.false;
        expect(from([1, 2]).isElementsEqual([3, 2])).to.be.false;
        expect(from([1, 2]).isElementsEqual([3, 2, 1])).to.be.false;
        expect(from([1, 2, 3]).isElementsEqual([3, 1])).to.be.false;

        expect(from([1, 2, 3]).isElementsEqual([6, 4, 2], (a, b) => a * 2 === b)).to.be.true;

        expect(from([
            new Person(10, 'a'),
            new Person(20, 'b')
        ]).isElementsEqual([
                new Person(20, 'b'),
                new Person(10, 'a'),
            ],
            (a, b) => a.age === b.age)).to.be.true;

        const x = [1, 2, 3];
        const y = [3, 1, 2];
        expect(from(x).isElementsEqual(y)).to.be.true;
        expect(x).to.deep.equal([1, 2, 3]); // should not modify x
        expect(y).to.deep.equal([3, 1, 2]); // should not modify y
    });
});
