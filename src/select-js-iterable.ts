import { ISelectJsIterable } from "./index";
import { WhereIterable } from "./iterables/where";

// export function selectJsIterable<T extends {new(...args:any[]):{}}>(extender: T) {
//     extender.prototype.where = function<TValue>(predicate: (value: TValue) => boolean): ISelectJsIterable<TValue> {
//         // @ts-ignore
//         return new WhereIterable<TValue>(this, predicate);
//     };
// }

export abstract class SelectJsMixin implements Iterable<any> {
    abstract [Symbol.iterator](): Iterator<any>;

    where<TValue>(predicate: (value: TValue) => boolean) {
        return new WhereIterable<TValue>(this, predicate);
    }
}
