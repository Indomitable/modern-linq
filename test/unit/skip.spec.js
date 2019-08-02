import { expect } from 'chai';
import { fromIterable } from "../../src";

describe('skip tests', () => {
    it('should skip first n numbers', () => {
        const output = fromIterable([1, 2, 3, 4, 5]).skip(2).toArray();
        expect(output).to.deep.equal([3, 4, 5]);
    });

    it('should skip first n numbers after another operation', () => {
        const output = fromIterable([1, 2, 3, 4, 5]).where(_ => _ > 2).skip(2).toArray();
        expect(output).to.deep.equal([5]);
    });

    it('should skip be able to continue with another operator', () => {
        const output = fromIterable([1, 2, 3, 4, 5])
            .where(_ => _ > 2)
            .skip(1)
            .select(x => `item_${x}`)
            .toArray();
        expect(output).to.deep.equal(['item_4', 'item_5']);
    });

    it('should skip return nothing if count is less', () => {
        const output = fromIterable([1, 2])
            .skip(3)
            .toArray();
        expect(output).to.deep.equal([]);
    });

    it('should skip return empty from empty collection', () => {
        const output = fromIterable([])
            .skip(2)
            .toArray();
        expect(output).to.deep.equal([]);
    });
});
