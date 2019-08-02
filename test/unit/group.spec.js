import { expect } from 'chai';
import { fromIterable, range } from "../../src";

describe('groupBy tests', () => {
    class Person {
        constructor(age, name) {
            this.age = age;
            this.name = name;
        }
    }

    let input = [];
    beforeEach(() => {
        input = [
            new Person(10, 'A'),
            new Person(20, 'B'),
            new Person(10, 'C'),
            new Person(30, 'D'),
            new Person(10, 'E'),
            new Person(20, 'F'),
        ];
    });

    it('should throw exception if no keySelector is provided', () => {
        const func = function () {
            return range(0, 1).groupBy();
        };
        expect(func).to.throw(Error);
    });

    it('should group collection', () => {
        const res = fromIterable(input).groupBy(_ => _.age).toArray();
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

    it('should group collection and select element', () => {
        const res = fromIterable(input).groupBy(_ => _.age, _ => _.name).toArray();
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

    it('should group collection and convert result', () => {
        const res = fromIterable(input).groupBy(_ => _.age, _ => _.name, (key, elms) => `${key}:${elms.toArray().join(',')}`).toArray();
        expect(res.length).to.equal(3);
        expect(res).to.deep.equal(['10:A,C,E', '20:B,F', '30:D']);
    });

    it('should group collection and convert result without element transform', () => {
        const res = fromIterable(input).groupBy(_ => _.age, (key, p) => `${key}:${p.select(_ => _.name).toArray().join(',')}`).toArray();
        expect(res.length).to.equal(3);
        expect(res).to.deep.equal(['10:A,C,E', '20:B,F', '30:D']);
    });
});
