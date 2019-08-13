import { fromIterable, range, from } from "../../src";
import { expect } from "chai";
import { Person } from "./models";

describe('order tests', () => {
    [
        range(100, 0),
        range(100, 0).toArray()
    ].forEach((source, indx) => {
        it('should be order items: ' + indx, () => {
            const result = fromIterable(source).orderBy(_ => _).toArray();
            const expected = range(1, 101).toArray();
            expect(result).to.deep.equal(expected);
        });
    });

    [
        range(0, 100),
        range(0, 100).toArray()
    ].forEach((source, indx) => {
        it('should be order descending items: ' + indx, () => {
            const result = fromIterable(source).orderByDescending(_ => _).toArray();
            const expected = range(99, -1).toArray();
            expect(result).to.deep.equal(expected);
        });
    });

    [
        ['C', 'B', 'A', 'DA', 'D', 'AB'],
        new Set(['C', 'B', 'A', 'DA', 'D', 'AB'])
    ].forEach((source, indx) => {
        it('should able to order string: ' + indx, () => {
            const result = fromIterable(source).orderBy(_ => _).toArray();
            const expected = ['A', 'AB', 'B', 'C', 'D', 'DA']
            expect(result).to.deep.equal(expected);
        });
    });

    it('should able to order items by key', () => {
        const input = [
            new Person(50, 'a'),
            new Person(10, 'b'),
            new Person(40, 'c'),
            new Person(4, 'd'),
            new Person(70, 'e'),
        ];
        const res = from(input)
            .orderBy(_ => _.age)
            .toArray();
        expect(res).to.deep.equals([input[3], input[1], input[2], input[0], input[4]]);

        const res1 = from(input)
            .orderBy(_ => _.age, (a, b) => a === 40 ? -1 : b === 40 ? 1 : (a < b ? -1 : a > b ? 1 : 0))
            .toArray();
        expect(res1).to.deep.equals([input[2], input[3], input[1], input[0], input[4]]);
    });

    it('should able to order items by key desending', () => {
        const input = [
            new Person(50, 'a'),
            new Person(10, 'b'),
            new Person(40, 'c'),
            new Person(4, 'd'),
            new Person(70, 'e'),
        ];
        const res = from(input)
            .orderByDescending(_ => _.age)
            .toArray();
        expect(res).to.deep.equals([input[4], input[0], input[2], input[1], input[3]]);
    });
});

