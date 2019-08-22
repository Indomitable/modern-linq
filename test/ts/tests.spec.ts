/**
 * This should be just basic tests which should verify if the typings are correct.
 * For functionality testing, test should be placed in corresponding ../unit/*.spec.js file.
 */
import {expect} from "chai";
import {from, fromArrayLike, fromIterable, fromObject, range, repeat} from "modern-linq";
import {Person, Pet} from "../unit/models";

describe("typescript tests", () => {
    it("typescript test 0", () => {
        const res = range(0, 10)
            .where(_ => _ % 2 === 1)
            .select(_ => _ * 2)
            .groupBy(_ => _ > 6, _ => _, (key, items) => ({key, items: items.toArray()}))
            .toArray();
        expect(res).to.deep.equals([
            {key: false, items: [2, 6]},
            {key: true, items: [10, 14, 18]}
        ]);
    });

    it("typescript test 1", () => {
        const input = [
            new Person(10, "A", [new Pet("a0", "A")]),
            new Person(20, "B", [new Pet("b0", "B"), new Pet("b1", "B")]),
            new Person(30, "C", []),
            new Person(40, "D", [new Pet("c0", "C"),]),
            new Person(10, "E", [new Pet("e0", "E"), new Pet("e1", "E"), new Pet("e1", "E")]),
            new Person(30, "G", []),
            new Person(70, "D", [new Pet("d0", "D")]),
            new Person(30, "J", [new Pet("j0", "J")]),
        ];
        const res = from(input)
            .selectMany(_ => _.pets, (o, p) => ({owner: o, pet: p}))
            .groupBy(_ => _.owner.age)
            .select(gr => ({
                age: gr.key,
                countPets: gr.count()
            }))
            .orderBy(_ => _.age)
            .toMap(_ => _.age, _ => _.countPets);
        expect(Array.from(res.entries())).to.deep.equals([[10, 4], [20, 2], [30, 1], [40, 1], [70, 1]]);
    });

    it("fromIterable", () => {
        const res = Array.from(fromIterable(new Set([0, 1, 2, 3])));
        expect(res).to.deep.equals([0, 1, 2, 3]);
    });

    it("fromObject", () => {
        const res0 = Array.from(fromObject({"a": 1, 2: "b"}));
        expect(res0).to.deep.equals([{key: "2", value: "b"}, {key: "a", value: 1}]);

        const res1 = Array.from(fromObject({"a": 1, 2: "b"}, (k, v) => ([k, v])));
        expect(res1).to.deep.equals([["2", "b"], ["a", 1]]);
    });

    it("fromArrayLike", () => {
        const res = Array.from(fromArrayLike({0: "a", 1: "b", 2: "c", length: 3}));
        expect(res).to.deep.equals(["a", "b", "c"]);
    });

    it("from", () => {
        const resIterable = Array.from(from(new Set([1, 2, 3])));
        expect(resIterable).to.deep.equal([1, 2, 3]);

        const resObject = Array.from(from({1: "a", 2: "b"}));
        expect(resObject).to.deep.equal([{key: "1", value: "a"}, {key: "2", value: "b"}]);

        const resArrayLike = Array.from(from({0: "a", 1: "b", 2: "c", length: 3}));
        expect(resArrayLike).to.deep.equals(["a", "b", "c"]);
    });

    it("range", () => {
        const resIncrease = Array.from(range(1, 4));
        expect(resIncrease).to.deep.equal([1, 2, 3]);

        const resDecrease = Array.from(range(5, 1));
        expect(resDecrease).to.deep.equal([5, 4, 3, 2]);
    });

    it("repeat", () => {
        const repeatNum = Array.from(repeat(1, 4));
        expect(repeatNum).to.deep.equal([1, 1, 1, 1]);

        const repeatStr = Array.from(repeat("a", 2));
        expect(repeatStr).to.deep.equal(["a", "a"]);
    });

    it("where", () => {
        const res = Array.from(range(0, 10).where(_ => _ % 2 === 1));
        expect(res).to.deep.equals([1, 3, 5, 7, 9]);
    });

    it("where type check", () => {
        function isNum(val: string | number): val is number {
            return typeof val === "number";
        }

        const res = Array.from(from([1, "a", 2, "b"]).where(isNum));
        expect(res).to.deep.equals([1, 2]);
    });

    it("select", () => {
        const res = Array.from(range(0, 10).select(_ => _ * 2));
        expect(res).to.deep.equals(range(0, 10).toArray().map(_ => _ * 2));
    });

    it("select many", () => {
        const source = {
            0: ["a", "b"],
            1: ["c"]
        };
        const res0 = Array.from(from(source).selectMany(_ => _.value));
        expect(res0).to.deep.equal(["a", "b", "c"]);

        const res1 = Array.from(from(source).selectMany(_ => _.value, (parent, child) => ({
            index: parent.key,
            child: child
        })));
        expect(res1).to.deep.equal([{index: "0", child: "a"}, {index: "0", child: "b"}, {index: "1", child: "c"}]);
    });

    it("take", () => {
        const res = Array.from(from(range(0, 10)).take(3));
        expect(res).to.deep.equal([0, 1, 2]);
    });

    it("take while", () => {
        const res = Array.from(from(range(0, 10)).takeWhile((x, i) => x < 5));
        expect(res).to.deep.equal([0, 1, 2, 3, 4]);
    });

    it("take last", () => {
        const res = Array.from(from(range(0, 10)).takeLast(2));
        expect(res).to.deep.equal([8, 9]);
    });

    it("skip", () => {
        const res = Array.from(from(range(0, 10)).skip(6));
        expect(res).to.deep.equal([6, 7, 8, 9]);
    });

    it("skip while", () => {
        const res = Array.from(from(range(0, 10)).skipWhile((x, i) => x < 8));
        expect(res).to.deep.equal([8, 9]);
    });

    it("skip last", () => {
        const res = Array.from(from(range(0, 10)).skipLast(6));
        expect(res).to.deep.equal([0, 1, 2, 3]);
    });

    it("distinct", () => {
        const res0 = Array.from(repeat("a", 5).distinct());
        expect(res0).to.deep.equal(["a"]);

        const res1 = Array.from(repeat(1, 3).distinct((a, b) => a === b));
        expect(res1).to.deep.equal([1]);
    });

    it("ofType", () => {
        const source = [
            1, "a", true, Symbol.for("b"), undefined, null, () => {
                return 1
            }, {}, false
        ];
        const resNum = Array.from(from(source).ofType("number"));
        expect(resNum).to.deep.equal([1]);
        const resStr = Array.from(from(source).ofType("string"));
        expect(resStr).to.deep.equal(["a"]);
        const resBool = Array.from(from(source).ofType("boolean"));
        expect(resBool).to.deep.equal([true, false]);
        const resSymbol = Array.from(from(source).ofType("symbol"));
        expect(resSymbol).to.deep.equal([Symbol.for("b")]);
        const resUndefined = Array.from(from(source).ofType("undefined"));
        expect(resUndefined).to.deep.equal([undefined]);
        const resFunc = Array.from(from(source).ofType("function"));
        expect(resFunc).to.deep.equal([source[6]]);
        const resObject = Array.from(from(source).ofType("object"));
        expect(resObject).to.deep.equal([null, {}]);

        function isNum(val: string | number): val is number {
            return typeof val === "number";
        }

        const resNum0 = Array.from(from(source).ofType(isNum));
        expect(resNum0).to.deep.equal([1]);
    });

    it('ofClass', () => {
        abstract class X {
        }

        class A extends X {
        }

        class B {
        }

        class C extends X {

        }

        const source = [new A(), new B(), new C()];
        const result = from(source).ofClass(X).toArray();
        expect(result[0] instanceof A).to.be.true;
        expect(result[1] instanceof C).to.be.true;
    });

    it('first', () => {
        expect(from([1, 2, 3]).first()).to.be.equal(1);
        expect(from([]).first()).to.be.equal(void 0);

        expect(from([1, 2, 3]).first(x => x === 2)).to.be.equal(2);
        expect(from([]).first(x => x === 10)).to.be.equal(void 0);
        expect(from([1, 2, 3]).first(x => x === 10)).to.be.equal(void 0);
    });

    it('firstIndex', () => {
        expect(from([1, 2, 3]).firstIndex(x => x === 3)).to.be.equal(2);
        expect(from([]).firstIndex(x => x === 3)).to.be.equal(-1);
        expect(from([1, 2, 3]).firstIndex(x => x === 10)).to.be.equal(-1);
    });

    it('firstOrDefault', () => {
        expect(from([1, 2, 3]).firstOrDefault(5)).to.be.equal(1);
        expect(from([]).firstOrDefault(5)).to.be.equal(5);

        expect(from([1, 2, 3]).firstOrDefault(5, x => x === 2)).to.be.equal(2);
        expect(from([]).firstOrDefault(5, x => x === 10)).to.be.equal(5);
        expect(from([1, 2, 3]).firstOrDefault(10, x => x === 10)).to.be.equal(10);
    });

    it('firstOrThrow', () => {
        expect(from([1, 2, 3]).firstOrThrow()).to.be.equal(1);
        expect(function () {
            from([]).firstOrThrow()
        }).to.throw(TypeError);

        expect(from([1, 2, 3]).firstOrThrow(x => x === 2)).to.be.equal(2);
        expect(function () {
            from([]).firstOrThrow(x => x === 2)
        }).to.throw(TypeError);
        expect(function () {
            from([1, 2, 3]).firstOrThrow(x => x === 10)
        }).to.throw(TypeError);
    });

    it('last', () => {
        expect(from([1, 2, 3]).last()).to.be.equal(3);
        expect(from([]).last()).to.be.equal(void 0);

        expect(from([1, 2, 2, 3]).last(x => x === 2)).to.be.equal(2);
        expect(from([]).last(x => x === 10)).to.be.equal(void 0);
        expect(from([1, 2, 3]).last(x => x === 10)).to.be.equal(void 0);
    });

    it('lastOrDefault', () => {
        expect(from([1, 2, 3]).lastOrDefault(5)).to.be.equal(3);
        expect(from([]).lastOrDefault(5)).to.be.equal(5);

        expect(from([1, 2, 3]).lastOrDefault(5, x => x === 2)).to.be.equal(2);
        expect(from([]).lastOrDefault(5, x => x === 10)).to.be.equal(5);
        expect(from([1, 2, 3]).lastOrDefault(10, x => x === 10)).to.be.equal(10);
    });

    it('lastOrThrow', () => {
        expect(from([1, 2, 3]).lastOrThrow()).to.be.equal(3);
        expect(function () {
            from([]).lastOrThrow()
        }).to.throw(TypeError);

        expect(from([1, 2, 3]).lastOrThrow(x => x === 2)).to.be.equal(2);
        expect(function () {
            from([]).lastOrThrow(x => x === 2)
        }).to.throw(TypeError);
        expect(function () {
            from([1, 2, 3]).lastOrThrow(x => x === 10)
        }).to.throw(TypeError);
    });

    it('lastIndex', () => {
        expect(from([1, 2, 3, 2, 3]).lastIndex(x => x === 3)).to.be.equal(4);
        expect(from([]).lastIndex(x => x === 3)).to.be.equal(-1);
        expect(from([1, 2, 3]).lastIndex(x => x === 10)).to.be.equal(-1);
    });

    it('intersect', () => {
        expect(from(new Set([1, 2, 3])).intersect([3, 2]).toArray()).to.deep.equal([2, 3]);
        expect(from([1, 2, 3, 2]).intersect([3, 2, 3]).toArray()).to.deep.equal([2, 3]);
        expect(from([1, 2, 3, 2]).intersect([3, 2, 3], (a, b) => a === b).toArray()).to.deep.equal([2, 3]);

        expect(from([1, 2, 3, 2]).intersect(['1', '2'], (a, b) => a.toString() === b).toArray()).to.deep.equal([1, 2]);
    });
});
