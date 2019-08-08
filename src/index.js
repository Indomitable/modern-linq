import { applyMixin } from './utils';
import { ArrayLikeIterable, LinqIterable } from './creation';
import { linqMixin } from './linq-mixin';
import { WhereIterable } from './iterables/where';
import { SelectIterable } from './iterables/select';
import { SelectManyIterable } from './iterables/select-many';
import { TakeIterable } from './iterables/take';
import { SkipIterable } from './iterables/skip';
import { RangeIterable } from './generators/range';
import { DistinctIterable } from './iterables/distinct';
import { Grouping, GroupIterable } from './iterables/group';
import { OrderIterable } from "./iterables/order";
import { ConcatIterable } from "./iterables/concat";
import { UnionIterable } from "./iterables/union";
import { GroupJoinIterable } from "./iterables/group-join";
import { JoinIterable } from "./iterables/join";

applyMixin(linqMixin, [
    LinqIterable,
    ArrayLikeIterable,
    WhereIterable,
    SelectIterable,
    SelectManyIterable,
    TakeIterable,
    SkipIterable,
    RangeIterable,
    DistinctIterable,
    Grouping,
    GroupIterable,
    OrderIterable,
    ConcatIterable,
    UnionIterable,
    GroupJoinIterable,
    JoinIterable,
]);

export { fromIterable, fromObject, fromArrayLike, range, from } from './creation';
