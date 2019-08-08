import { expect } from 'chai';
import { from, fromIterable, range } from "../../src";
import { Person, Pet } from "./models";

describe('groupJoin tests', () => {
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
            const res = from(source.persons).groupJoin(source.pets, s => s.name, i => i.owner, (person, pets) => ({ person, pets })).toArray();
            expect(res).to.deep.equal([
                { person: persons[0], pets: [ pets[1] ] },
                { person: persons[1], pets: [ pets[2], pets[3] ] },
                { person: persons[2], pets: [ pets[0] ] },
                { person: persons[3], pets: [] },
            ]);
        });
    });
});
