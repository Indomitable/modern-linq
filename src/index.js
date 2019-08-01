import { applyMixin } from './utils';
import { LinqIterable } from './creation';
import { linqMixin } from './linq-mixin';
import { WhereIterable } from './iterables/where';
import { SelectIterable } from './iterables/select';
import { SelectManyIterable } from './iterables/select-many';
import { TakeIterable } from './iterables/take';
import { SkipIterable } from './iterables/skip';
import { RangeIterable } from './generators/range';
import { DistinctIterable } from './iterables/distinct';

applyMixin(LinqIterable, linqMixin);
applyMixin(WhereIterable, linqMixin);
applyMixin(SelectIterable, linqMixin);
applyMixin(SelectManyIterable, linqMixin);
applyMixin(TakeIterable, linqMixin);
applyMixin(SkipIterable, linqMixin);
applyMixin(RangeIterable, linqMixin);
applyMixin(DistinctIterable, linqMixin);

export { fromIterable, fromObject, range } from './creation';
