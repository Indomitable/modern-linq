import { WhereIterable } from "./iterables/where";
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
import {OrderIterable} from "./iterables/order";

export const linqMixin = {
    where(predicate) {
        return new WhereIterable(this, predicate);
    },
    select(map) {
        return new SelectIterable(this, map);
    },
    selectMany(map) {
        return new SelectManyIterable(this, map);
    },
    take(count) {
        return new TakeIterable(this, count);
    },
    skip(count) {
        return new SkipIterable(this, count);
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
            return new WhereIterable(this, function (item) {
                return item instanceof type;
            });
        }
    },
    groupBy(keySelector, elementSelector, resultCreator) {
        return new GroupIterable(this, keySelector, elementSelector, resultCreator);
    },
    orderBy(keySelector, comparer) {
        return new OrderIterable(this, keySelector, 1, comparer);
    },
    orderByDescending(keySelector, comparer) {
        return new OrderIterable(this, keySelector, -1, comparer);
    },
    toArray() {
        const result = this.get();
        return Array.isArray(result) ? result : Array.from(result);
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
    firstOrThrow() {
        return FirstFinalizer.getOrThrow(this);
    },
    single(predicate) {
        return SingleFinalizer.get(this, predicate);
    },
    singleOrDefault(def, predicate) {
        return SingleFinalizer.getOrDefault(this, def, predicate);
    },
    all(predicate) {
        return AllFinalizer.get(this.get(), predicate)
    },
    allAndEvery(predicate) {
        return AllFinalizer.getAllAndEvery(this.get(), predicate)
    },
    any(predicate) {
        return AnyFinalizer.get(this.get(), predicate)
    },
    count(predicate) {
        return CountFinalizer.get(this.get(), predicate);
    },
    aggregate(accumulator, initial) {
        switch (arguments.length) {
            case 1: {
                return AggregateFinalizer.get(this.get(), accumulator);
            }
            case 2: {
                // here the resultCreator actually is the initial
                return AggregateFinalizer.getWithInitial(this.get(), accumulator, initial);
            }
            default: {
                throw new RangeError('invalid arguments');
            }
        }
    },
    sum() {
        return AggregateFinalizer.get(this.get(), (r, i) => r + i);
    },
    product() {
        return AggregateFinalizer.get(this.get(), (r, i) => r * i);
    },
    min(comparer) {
        const compare = typeof comparer === 'undefined' ? (a, b) => a - b : comparer;
        return AggregateFinalizer.get(this.get(), (a, b) => {
            const comp = compare(a, b);
            return comp < 0 ? a : (comp > 0 ? b : a);
        });
    },
    max(comparer) {
        const compare = typeof comparer === 'undefined' ? (a, b) => a - b : comparer;
        return AggregateFinalizer.get(this.get(), (a, b) => {
            const comp = compare(a, b);
            return comp < 0 ? b : (comp > 0 ? a : b);
        });
    },
    join(separator) {
        return this.select(_ => '' + _).toArray().join(separator);
    }
};
