import { applyMixin } from './utils';
import { SelectJsIterable } from './creation';
import { selectJsMixin } from './select-js-mixin';
import { WhereIterable } from './iterables/where';
import { SelectIterable } from './iterables/select';
import { SelectManyIterable } from './iterables/select-many';
import { TakeIterable } from './iterables/take';
import { SkipIterable } from './iterables/skip';
import { RangeIterable } from './generators/range';

applyMixin(SelectJsIterable, selectJsMixin);
applyMixin(WhereIterable, selectJsMixin);
applyMixin(SelectIterable, selectJsMixin);
applyMixin(SelectManyIterable, selectJsMixin);
applyMixin(TakeIterable, selectJsMixin);
applyMixin(SkipIterable, selectJsMixin);
applyMixin(RangeIterable, selectJsMixin);

export { fromIterable, fromObject, range } from './creation';
