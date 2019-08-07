import { expect } from 'chai';
import { fromIterable, range } from "../../src";

describe('concat tests', () => {
    [
        [ range(0, 10).toArray(), range(10, 20).toArray() ],
        [ range(0, 10), range(10, 20) ],
        [ range(0, 10).toArray(), range(10, 20) ],
        [ range(0, 10), range(10, 20).toArray() ],
    ].forEach((source, indx) => {
        it('should take first n numbers: ' + indx, () => {
            const res = fromIterable(source[0]).concat(source[1]).toArray();
            expect(res).to.deep.equal(range(0, 20).toArray());
        });
    });
});
