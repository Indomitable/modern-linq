import { expect } from 'chai';
import { fromIterable, range } from "../../src";
import { Person } from "./models";

describe('element at tests', () => {

    [
        range(0, 10),
        range(0, 10).toArray(),
    ].forEach((source, indx) => {
        it('get elements on different indexes: ' + indx, () => {
            const iterable = fromIterable(source);
            for (const i of range(0, 10)) {
                expect(iterable.elementAt(i)).to.equal(i);
            }
            expect(iterable.elementAt(11)).to.be.undefined;
        });
    });
});
