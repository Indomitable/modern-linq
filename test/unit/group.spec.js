import { expect } from 'chai';
import { from, fromIterable, range } from "../../src";
import { Person } from "./models";

describe('groupBy tests', () => {
    const input = [
        new Person(10, 'A'),
        new Person(20, 'B'),
        new Person(10, 'C'),
        new Person(30, 'D'),
        new Person(10, 'E'),
        new Person(20, 'F'),
    ];
    const setInput = new Set(input);

    it('should throw exception if no keySelector is provided', () => {
        const func = function () {
            return range(0, 1).groupBy();
        };
        expect(func).to.throw(Error);
    });

    [
        input,
        setInput
    ].forEach((source, indx) => {
        it('should group collection: ' + indx, () => {
            const res = fromIterable(source).groupBy(_ => _.age).toArray();
            expect(res.length).to.equal(3);
            for (const gr of res) {
                switch (gr.key) {
                    case 10: {
                        expect(gr.toArray()).to.deep.equal([ input[0], input[2], input[4] ]);
                        break;
                    }
                    case 20: {
                        expect(gr.toArray()).to.deep.equal([ input[1], input[5] ]);
                        break;
                    }
                    case 30: {
                        expect(gr.toArray()).to.deep.equal([ input[3] ]);
                        break;
                    }
                    default:
                        throw new Error('unknown key');
                }
            }
        });
    });

    [
        input,
        setInput
    ].forEach((source, indx) => {
        it('should group collection and select element: ' + indx, () => {
            const res = fromIterable(source).groupBy(_ => _.age, _ => _.name).toArray();
            expect(res.length).to.equal(3);
            for (const gr of res) {
                switch (gr.key) {
                    case 10: {
                        expect(gr.count()).to.equal(3);
                        expect(gr.toArray()).to.deep.equal(['A', 'C', 'E']);
                        break;
                    }
                    case 20: {
                        expect(gr.count()).to.equal(2);
                        expect(gr.toArray()).to.deep.equal(['B', 'F']);
                        break;
                    }
                    case 30: {
                        expect(gr.count()).to.equal(1);
                        expect(gr.toArray()).to.deep.equal(['D']);
                        break;
                    }
                    default:
                        throw new Error('unknown key');
                }
            }
        });
    });

    [
        input,
        setInput
    ].forEach((source, indx) => {
        it('should group collection and convert result: ' + indx, () => {
            const res = fromIterable(source).groupBy(_ => _.age, _ => _.name, (key, elms) => `${key}:${elms.toArray().join(',')}`).toArray();
            expect(res.length).to.equal(3);
            expect(res).to.deep.equal(['10:A,C,E', '20:B,F', '30:D']);
        });
    });

    [
        input,
        setInput
    ].forEach((source, indx) => {
        it('should group collection and convert result without element transform: ' + indx, () => {
            const res = fromIterable(source).groupBy(_ => _.age, (key, p) => `${key}:${p.select(_ => _.name).toArray().join(',')}`).toArray();
            expect(res.length).to.equal(3);
            expect(res).to.deep.equal(['10:A,C,E', '20:B,F', '30:D']);
        });
    });

    it('should be able to work with strings', () => {
        const res = from('abcdeabcdebbacc').groupBy(_ => _).where(g => g.count() < 4).select(g => g.key).join('');
        expect(res).to.equal('ade');
    });

    it('should throw if group by object', () => {
        const func = function () { return from(input).groupBy(_ => ({ age: _.age })).toArray() };
        expect(func).to.throw(TypeError);
    });

    it('should throw if group by function', () => {
        const func = function () { return from(input).groupBy(_ => (function() {})).toArray() };
        expect(func).to.throw(TypeError);
    });

    it('should not throw if group by null or undefined', () => {
        const res = from('abcdeabcdebbacc')
            .groupBy(_ => _ === 'a' ? null : (_ === 'b' ? undefined : _), _ => _, (key, group) => ({ key: key, group: group.toArray() }))
            .toArray();
        expect(res).to.deep.equal([
            { key: null, group: ['a', 'a', 'a'] },
            { key: undefined, group: ['b', 'b', 'b', 'b'] },
            { key: 'c', group: ['c', 'c', 'c', 'c'] },
            { key: 'd', group: ['d', 'd'] },
            { key: 'e', group: ['e', 'e'] }
        ]);
    });
});
