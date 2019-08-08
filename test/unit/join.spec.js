import { expect } from 'chai';
import { from, fromIterable, range } from "../../src";
import { Person, Pet } from "./models";

describe('join tests', () => {
    [
        range(0, 5),
        range(0, 5).toArray()
    ].forEach((source, indx) => {
        it('should join sequence: ' + indx, () => {
            // use iterable
            const res0 = fromIterable(source).join(',');
            expect(res0).to.be.equal('0,1,2,3,4');
        });
    });

    [
        [1, 'a', null, {}, undefined, true],
        new Set([1, 'a', null, {}, undefined, true])
    ].forEach((source, indx) => {
        it('should join different types: ' + indx, () => {
            const res = fromIterable(source).join(',');
            expect(res).to.be.equal('1,a,null,[object Object],undefined,true');
        });
    });

    it('should return empty when done over empty sequence', () => {
        const res = fromIterable([]).join(',');
        expect(res).to.be.equal('');
    });

    const persons = [
        new Person(10, 'Owner 0'),
        new Person(20, 'Owner 1'),
        new Person(30, 'Owner 2'),
        new Person(40, 'Owner 3'),
    ];

    const pets = [
        new Pet('Pet 0', 'Owner 2'),
        new Pet('Pet 1', 'Owner 0'),
        new Pet('Pet 2', 'Owner 1'),
        new Pet('Pet 3', 'Owner 1'),
        new Pet('Pet 4', 'Owner 4'),
    ];

    [
        { persons: new Set(persons), pets: new Set(pets) },
        { persons: persons, pets: pets },
        { persons: new Set(persons), pets: pets },
        { persons: persons, pets: new Set(pets) },
    ].forEach((source, indx) => {
        it('should join arrays: ' + indx, () => {
            const res = from(source.persons).join(source.pets, s => s.name, i => i.owner, (person, pet) => ({ person, pet })).toArray();
            expect(res).to.deep.equal([
                { person: persons[0], pet: pets[1] },
                { person: persons[1], pet: pets[2] },
                { person: persons[1], pet: pets[3] },
                { person: persons[2], pet: pets[0] },
            ]);
        });
    });
});
