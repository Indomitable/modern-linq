import { WhereIterable, WhereIterableFactory } from "./iterables/where";
import { SelectIterable } from "./iterables/select";
import { SelectManyIterable } from "./iterables/select-many";
import { FirstFinalizer } from "./finalizers/first";
import { SingleFinalizer } from "./finalizers/single";
import { TakeIterable } from "./iterables/take";
import { SkipIterable } from "./iterables/skip";
import { AllFinalizer } from "./finalizers/all";
import { AnyFinalizer } from "./finalizers/any";
import { DistinctIterable } from "./iterables/distinct";
import { GroupIterable } from "./iterables/group";
import { CountFinalizer } from "./finalizers/count";
import { AggregateFinalizer } from "./finalizers/aggregate";
import { OrderIterable, OrderIterableDescending } from "./iterables/order";
import { ConcatIterable } from "./iterables/concat";
import { ForEachFinalizer } from "./finalizers/for-each";
import { ElementAtFinalizer } from "./finalizers/element-at";
import { ToArrayFinalizer } from "./finalizers/to-array";
import { UnionIterable } from "./iterables/union";
import { GroupJoinIterable } from "./iterables/group-join";
import { JoinIterable } from "./iterables/join";
import { EqualFinalizer } from "./finalizers/equal";
import { PageIterable } from "./iterables/page";
import { defaultSortComparer } from "./utils";
import { ReverseIterable } from "./iterables/reverse";
import { TakeWhileIterable } from "./iterables/take-while";
import { SkipWhileIterable } from "./iterables/skip-while";
import { TakeLastIterable } from "./iterables/take-last";
import { SkipLastIterable } from "./iterables/skip-last";
import { LastFinalizer } from "./finalizers/last";
import { IntersectIterable } from "./iterables/intersect";

export const linqMixin = {
    where(predicate) {
        return WhereIterableFactory.create(this, predicate);
    },
    select(map) {
        return new SelectIterable(this, map);
    },
    selectMany(innerSelector, resultCreator) {
        return new SelectManyIterable(this, innerSelector, resultCreator);
    },
    take(count) {
        return new TakeIterable(this, count);
    },
    takeWhile(condition) {
        return new TakeWhileIterable(this, condition);
    },
    takeLast(count) {
        return new TakeLastIterable(this, count);
    },
    skip(count) {
        return new SkipIterable(this, count);
    },
    skipWhile(condition) {
        return new SkipWhileIterable(this, condition);
    },
    skipLast(count) {
        return new SkipLastIterable(this, count);
    },
    distinct(comparer) {
        return new DistinctIterable(this, comparer);
    },
    ofType(type) {
        if (typeof type === 'string') {
            return new WhereIterable(this, function (item) {
                return typeof item === type;
            });
        } else {
            return new WhereIterable(this, type);
        }
    },
    ofClass(classType) {
        return new WhereIterable(this, function (item) {
            return item instanceof classType;
        });
    },
    groupBy(keySelector, elementSelector, resultCreator) {
        return new GroupIterable(this, keySelector, elementSelector, resultCreator);
    },
    orderBy(keySelector, comparer) {
        return new OrderIterable(this, keySelector, comparer);
    },
    orderByDescending(keySelector, comparer) {
        return new OrderIterableDescending(this, keySelector, comparer);
    },
    groupJoin(joinIterable, sourceKeySelector, joinIterableKeySelector, resultCreator) {
        return new GroupJoinIterable(this, joinIterable, sourceKeySelector, joinIterableKeySelector, resultCreator);
    },
    join(joinIterable, sourceKeySelector, joinIterableKeySelector, resultCreator) {
        if (arguments.length === 1) {
            return this.select(_ => '' + _).toArray().join(/*separator*/joinIterable); // join items of sequence in string. here joinIterable === separator
        }
        return new JoinIterable(this, joinIterable, sourceKeySelector, joinIterableKeySelector, resultCreator);
    },
    concat(secondIterable) {
        return new ConcatIterable(this, secondIterable);
    },
    union(secondIterable) {
        return new UnionIterable(this, secondIterable);
    },
    intersect(secondIterable, comparer) {
        return new IntersectIterable(this, secondIterable, comparer);
    },
    page(pageSize) {
        return new PageIterable(this, pageSize);
    },
    reverse() {
        return new ReverseIterable(this);
    },
    toArray(map) {
        return ToArrayFinalizer.get(this, map);
    },
    toMap(keySelector, valueSelector) {
        const transformValue = typeof valueSelector === 'undefined';
        return new Map(this.select(_ => [
                keySelector(_),
                transformValue ? _ : valueSelector(_)
            ])
        );
    },
    toSet() {
        return new Set(this.get());
    },
    first(predicate) {
        return FirstFinalizer.get(this, predicate);
    },
    firstOrDefault(def, predicate) {
        return FirstFinalizer.getOrDefault(this, def, predicate);
    },
    firstOrThrow(predicate) {
        return FirstFinalizer.getOrThrow(this, predicate);
    },
    firstIndex(predicate) {
        return FirstFinalizer.firstIndex(this, predicate);
    },
    last(predicate) {
        return LastFinalizer.get(this, predicate);
    },
    lastOrDefault(def, predicate) {
        return LastFinalizer.getOrDefault(this, def, predicate);
    },
    lastOrThrow(predicate) {
        return LastFinalizer.getOrThrow(this, predicate);
    },
    lastIndex(predicate) {
        return LastFinalizer.lastIndex(this, predicate);
    },
    single(predicate) {
        return SingleFinalizer.get(this, predicate);
    },
    singleOrDefault(def, predicate) {
        return SingleFinalizer.getOrDefault(this, def, predicate);
    },
    all(predicate) {
        return AllFinalizer.get(this, predicate)
    },
    allAndEvery(predicate) {
        return AllFinalizer.getAllAndEvery(this, predicate)
    },
    any(predicate) {
        return AnyFinalizer.get(this, predicate)
    },
    count(predicate) {
        return CountFinalizer.get(this, predicate);
    },
    aggregate(accumulator, initial) {
        switch (arguments.length) {
            case 1: {
                return AggregateFinalizer.get(this, accumulator);
            }
            case 2: {
                // here the resultCreator actually is the initial
                return AggregateFinalizer.getWithInitial(this, accumulator, initial);
            }
            default: {
                throw new RangeError('invalid arguments');
            }
        }
    },
    sum() {
        return AggregateFinalizer.get(this, (r, i) => r + i);
    },
    product() {
        return AggregateFinalizer.get(this, (r, i) => r * i);
    },
    min(comparer) {
        const compare = typeof comparer === 'undefined' ? defaultSortComparer : comparer;
        return AggregateFinalizer.get(this, (a, b) => {
            const comp = compare(a, b);
            return comp < 0 ? a : (comp > 0 ? b : a);
        });
    },
    max(comparer) {
        const compare = typeof comparer === 'undefined' ? defaultSortComparer  : comparer;
        return AggregateFinalizer.get(this, (a, b) => {
            const comp = compare(a, b);
            return comp < 0 ? b : (comp > 0 ? a : b);
        });
    },
    elementAt(index) {
        return ElementAtFinalizer.get(this, index);
    },
    forEach(action) {
        return ForEachFinalizer.get(this, action);
    },
    isEqual(iterable, comparer) {
        return EqualFinalizer.get(this, iterable, comparer);
    },
    isElementsEqual(iterable, comparer) {
        return EqualFinalizer.getDifferentPosition(this, iterable, comparer);
    }
};
