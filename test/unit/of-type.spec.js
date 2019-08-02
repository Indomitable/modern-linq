import { expect } from 'chai';
import { fromIterable } from "../../src";

describe('oftype tests', () => {
    it('should check for primary types', () => {
        const source = [1, 2, 3, 'a', 4, 5, 's', true, 'c', false];
        const inputNumber = fromIterable(source).ofType('number');
        expect(Array.from(inputNumber)).to.deep.equal([1, 2, 3, 4, 5]);
        const inputStr = fromIterable(source).ofType('string');
        expect(Array.from(inputStr)).to.deep.equal(['a', 's', 'c']);

        const inputBool = fromIterable(source).ofType('boolean');
        expect(Array.from(inputBool)).to.deep.equal([true, false]);
    });

    it('should check for function types', () => {
        class A {
        }

        class B {
        }

        const source = [new A(), new B()];
        const result = fromIterable(source).ofType(A);
        const arr = Array.from(result);
        expect(arr.length).to.equal(1);
        expect(arr.every(_ => _ instanceof A)).to.be.true;
    });
});
