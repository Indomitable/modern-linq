import { ISelectJsIterable } from "./index";
import { applyMixins } from "./utils";
import { SelectJsMixin } from "./select-js-iterable";

// @ts-ignore
export class SelectJsIterable<TValue> implements ISelectJsIterable<TValue> {
    constructor(private source: Iterable<TValue>) {

    }

    [Symbol.iterator]() {
        return this.source[Symbol.iterator]();
    }
}

export function toSelectIterable<TValue>(source: Iterable<TValue>): ISelectJsIterable<TValue> {
    // @ts-ignore
    return new SelectJsIterable(source);
}

