import { applyMixin } from './utils';
import { ArrayLikeIterable, LinqIterable, ObjectIterable } from './creation';
import { linqMixin } from './linq-mixin';
import { WhereIterable } from './iterables/where';
import { SelectIterable } from './iterables/select';
import { SelectManyIterable } from './iterables/select-many';
import { TakeIterable } from './iterables/take';
import { SkipIterable } from './iterables/skip';
import { RangeIterable } from './generators/range';
import { DistinctIterable } from './iterables/distinct';
import { Grouping, GroupIterable } from './iterables/group';
import { OrderIterable, OrderIterableDescending } from "./iterables/order";
import { ConcatIterable } from "./iterables/concat";
import { UnionIterable } from "./iterables/union";
import { GroupJoinIterable } from "./iterables/group-join";
import { JoinIterable } from "./iterables/join";
import { RepeatIterable } from "./generators/repeat";
import { PageIterable } from "./iterables/page";
import { FlatIterable } from "./iterables/flat";
import { ReverseIterable } from "./iterables/reverse";

// note: if using class as output we can just apply the mixin to BaseLinqIterable.
applyMixin(linqMixin, [
    LinqIterable,
    ArrayLikeIterable,
    ObjectIterable,
    WhereIterable,
    SelectIterable,
    SelectManyIterable,
    FlatIterable,
    TakeIterable,
    SkipIterable,
    RangeIterable,
    RepeatIterable,
    DistinctIterable,
    Grouping,
    GroupIterable,
    OrderIterable,
    OrderIterableDescending,
    ConcatIterable,
    UnionIterable,
    GroupJoinIterable,
    JoinIterable,
    PageIterable,
    ReverseIterable
]);

export { fromIterable, fromObject, fromArrayLike, range, from, repeat } from './creation';
