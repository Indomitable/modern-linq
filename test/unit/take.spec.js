import { expect } from 'chai';
import { fromIterable } from "../../src";

describe('take tests', () => {
    it('should take first n numbers', () => {
        const output = fromIterable([1, 2, 3, 4, 5]).take(3).toArray();
        expect(output).to.deep.equal([1, 2, 3]);
    });

    it('should take first n numbers after another operation', () => {
        const output = fromIterable([1, 2, 3, 4, 5]).where(_ => _ > 2).take(3).toArray();
        expect(output).to.deep.equal([3, 4, 5]);
    });

    it('should take be able to continue with another operator', () => {
        const output = fromIterable([1, 2, 3, 4, 5])
            .where(_ => _ > 2)
            .take(3)
            .select(x => `item_${x}`)
            .toArray();
        expect(output).to.deep.equal(['item_3', 'item_4', 'item_5']);
    });

    it('should take all elements if source count is less', () => {
        const output = fromIterable([1, 2])
            .take(3)
            .toArray();
        expect(output).to.deep.equal([1, 2]);
    });

    it('should take nothing from empty collection', () => {
        const output = fromIterable([])
            .take(1)
            .toArray();
        expect(output).to.deep.equal([]);
    });
});
