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
import { ReverseIterable } from "./iterables/reverse";
import { TakeWhileIterable } from "./iterables/take-while";
import { SkipWhileIterable } from "./iterables/skip-while";
import { TakeLastIterable } from "./iterables/take-last";
import { SkipLastIterable } from "./iterables/skip-last";
import { IntersectIterable } from "./iterables/intersect";

// note: if using class as output we can just apply the mixin to BaseLinqIterable.
applyMixin(linqMixin, [
    LinqIterable,
    ArrayLikeIterable,
    ObjectIterable,
    WhereIterable,
    SelectIterable,
    SelectManyIterable,
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
    ReverseIterable,
    TakeWhileIterable,
    SkipWhileIterable,
    TakeLastIterable,
    SkipLastIterable,
    IntersectIterable,
]);

export { fromIterable, fromObject, fromArrayLike, range, from, repeat } from './creation';
