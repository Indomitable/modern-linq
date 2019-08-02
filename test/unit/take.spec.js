import { expect } from 'chai';
import { fromIterable, range } from "../../src";

describe('take tests', () => {
    it('should take first n numbers', () => {
        const output0 = fromIterable([1, 2, 3, 4, 5]).take(3).toArray();
        expect(output0).to.deep.equal([1, 2, 3]);

        // use iterable
        const output1 = range(1, 6).take(3).toArray();
        expect(output1).to.deep.equal([1, 2, 3]);
    });

    it('should take first n numbers after another operation', () => {
        const output0 = fromIterable([1, 2, 3, 4, 5]).where(_ => _ > 2).take(3).toArray();
        expect(output0).to.deep.equal([3, 4, 5]);

        // use iterable
        const output1 = range(1, 6).where(_ => _ > 2).take(3).toArray();
        expect(output1).to.deep.equal([3, 4, 5]);
    });

    it('should take be able to continue with another operator', () => {
        const output0 = fromIterable([1, 2, 3, 4, 5])
            .where(_ => _ > 2)
            .take(3)
            .select(x => `item_${x}`)
            .toArray();
        expect(output0).to.deep.equal(['item_3', 'item_4', 'item_5']);

        // use iterable
        const output1 = range(1, 6)
            .where(_ => _ > 2)
            .take(3)
            .select(x => `item_${x}`)
            .toArray();
        expect(output1).to.deep.equal(['item_3', 'item_4', 'item_5']);
    });

    it('should take all elements if source count is less', () => {
        // use array
        const output0 = fromIterable([1, 2])
            .take(3)
            .toArray();
        expect(output0).to.deep.equal([1, 2]);

        // use iterable
        const output1 = range(1, 3)
            .take(3)
            .toArray();
        expect(output1).to.deep.equal([1, 2]);
    });

    it('should take nothing from empty collection', () => {
        const output0 = fromIterable([])
            .take(1)
            .toArray();
        expect(output0).to.deep.equal([]);

        const output1 = range(1, 1)
            .take(1)
            .toArray();
        expect(output1).to.deep.equal([]);
    });
});
