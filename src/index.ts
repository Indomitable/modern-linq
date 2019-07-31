import { applyMixins } from './utils';
import { SelectJsIterable } from './creation';
import { SelectJsMixin } from './select-js-iterable';
import { WhereIterable } from './iterables/where';

export interface ISelectJsIterable<TValue> extends Iterable<TValue> {
    where(predicate: (value: TValue) => boolean): ISelectJsIterable<TValue>;
    select<TMap>(transform: (value: TValue) => TMap): ISelectJsIterable<TMap>;
}

applyMixins(SelectJsIterable, [ SelectJsMixin ]);
applyMixins(WhereIterable, [ SelectJsMixin ]);

export { toSelectIterable as toSelect } from './creation';
