import { expect } from 'chai';
import { from, range } from 'modern-linq';
import { Person, Pet } from '../unit/models';

describe('typescript tests', () => {
    it('typescript test 0', () => {
        const res = range(0, 10)
            .where(_ => _ % 2 === 1)
            .select(_ => _ * 2)
            .groupBy(_ => _ > 6, _ => _, (key, items) => ({ key, items: items.toArray() }))
            .toArray();
        expect(res).to.deep.equals([
            { key: false, items: [2, 6] },
            { key: true, items: [10, 14, 18] }
        ]);
    });

    it('typescript test 1', () => {
        const input = [
            new Person(10, 'A', [new Pet('a0', 'A')]),
            new Person(20, 'B', [new Pet('b0', 'B'), new Pet('b1', 'B')]),
            new Person(30, 'C', []),
            new Person(40, 'D', [new Pet('c0', 'C'),]),
            new Person(10, 'E', [new Pet('e0', 'E'), new Pet('e1', 'E'), new Pet('e1', 'E')]),
            new Person(30, 'G', []),
            new Person(70, 'D', [new Pet('d0', 'D')]),
            new Person(30, 'J', [new Pet('j0', 'J')]),
        ];
        const res = from(input)
            .flat(_ => _.pets)
            .groupBy(_ => _.outer.age)
            .select(gr => ({
                age: gr.key,
                countPets: gr.count()
            }))
            .orderBy(_ => _.age)
            .toMap(_ => _.age, _ => _.countPets);
        expect(Array.from(res.entries())).to.deep.equals([[10, 4], [20, 2], [30, 1], [40, 1], [70, 1]]);
    });
});
