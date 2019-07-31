import { ISelectJsIterable } from "../index";
import { SelectJsMixin } from "../select-js-iterable";
import { applyMixins } from "../utils";

// @ts-ignore
export class WhereIterable<TValue> implements ISelectJsIterable<TValue> {
    constructor(private source: Iterable<TValue>,
				private predicate: (value: TValue) => boolean) {
	}
	[Symbol.iterator]: () => Iterator<TValue> = () => {
		const iterator = this.source[Symbol.iterator]();
		const predicate = this.predicate;
		return {
			next(): IteratorResult<TValue> {
				while (true) {
					const { done, value } = iterator.next();
					if (done) {
						return {
							done: true
						} as IteratorResult<TValue>;
					}
					if (predicate(value)) {
						return {
							done: false,
							value
						};
					}
				}
			}
		};
    }

    // where(predicate: (value: TValue) => boolean): ISelectJsIterable<TValue> {
    //     return new WhereIterable(this, predicate);
    // }
    // select<TMap>(transform: (value: TValue) => TMap): ISelectJsIterable<TMap> {
    //     throw new Error("Method not implemented.");
    // }

}

applyMixins(WhereIterable, [ SelectJsMixin ]);

