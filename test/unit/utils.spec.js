import { expect } from 'chai';
import { insertOrdered, search } from "../../src/utils";

describe('utils functions tests', () => {
    it('should search in ordered array', () => {
        const array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
        const comparer = (a, b) => a < b ? -1 : (a > b) ? 1 : 0;
        const res0 = search(array, 'i', comparer);
        expect(res0).to.equal(8);
        const res1 = search(array, 'e', comparer);
        expect(res1).to.equal(4);
        const res2 = search(array, 'b', comparer);
        expect(res2).to.equal(1);

        expect(search(array, 'z', comparer)).to.equal(-1);
        expect(search(array, '!', comparer)).to.equal(-1);
    });

    it('should be able to insert values in ordered array and to keep order', () => {
        const array = [];
        const comparer = (a, b) => {
            if (typeof a === 'undefined') {
                return 1;
            }
            if (typeof b === 'undefined') {
                return -1;
            }
            if (a === null) {
                if (typeof b === 'undefined') {
                    return -1;
                }
                return 1;
            }
            if (b === null) {
                if (typeof a === 'undefined') {
                    return 1;
                }
                return -1;
            }
            a = typeof a === 'string' ? a.charCodeAt(0) : a;
            b = typeof b === 'string' ? b.charCodeAt(0) : b;
            return a < b ? -1 : (a > b) ? 1 : 0;
        };
        insertOrdered(array, 6, comparer);
        expect(array).to.deep.equal([6]);
        insertOrdered(array, 3, comparer);
        expect(array).to.deep.equal([3, 6]);
        insertOrdered(array, 7, comparer);
        expect(array).to.deep.equal([3, 6, 7]);
        insertOrdered(array, 4, comparer);
        expect(array).to.deep.equal([3, 4, 6, 7]);
        insertOrdered(array, 4, comparer);
        expect(array).to.deep.equal([3, 4, 4, 6, 7]);
        insertOrdered(array, 0, comparer);
        expect(array).to.deep.equal([0, 3, 4, 4, 6, 7]);
        insertOrdered(array, 5, comparer);
        expect(array).to.deep.equal([0, 3, 4, 4, 5, 6, 7]);
        insertOrdered(array, 7, comparer);
        expect(array).to.deep.equal([0, 3, 4, 4, 5, 6, 7, 7]);
        insertOrdered(array, 0, comparer);
        expect(array).to.deep.equal([0, 0, 3, 4, 4, 5, 6, 7, 7]);
        insertOrdered(array, 'a', comparer);
        expect(array).to.deep.equal([0, 0, 3, 4, 4, 5, 6, 7, 7, 'a']);
        insertOrdered(array, 'c', comparer);
        expect(array).to.deep.equal([0, 0, 3, 4, 4, 5, 6, 7, 7, 'a', 'c']);
        insertOrdered(array, 'b', comparer);
        expect(array).to.deep.equal([0, 0, 3, 4, 4, 5, 6, 7, 7, 'a', 'b', 'c']);
        insertOrdered(array, 'b', comparer);
        expect(array).to.deep.equal([0, 0, 3, 4, 4, 5, 6, 7, 7, 'a', 'b', 'b', 'c']);
        insertOrdered(array, undefined, comparer);
        expect(array).to.deep.equal([0, 0, 3, 4, 4, 5, 6, 7, 7, 'a', 'b', 'b', 'c', undefined]);
        insertOrdered(array, null, comparer);
        expect(array).to.deep.equal([0, 0, 3, 4, 4, 5, 6, 7, 7, 'a', 'b', 'b', 'c', null, undefined]);
    });
});
