import { expect } from 'chai';
import { from, fromIterable, range } from "../../src";
import Person from "./person";

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
                        expect(gr.count()).to.equal(3);
                        break;
                    }
                    case 20: {
                        expect(gr.count()).to.equal(2);
                        break;
                    }
                    case 30: {
                        expect(gr.count()).to.equal(1);
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
});
