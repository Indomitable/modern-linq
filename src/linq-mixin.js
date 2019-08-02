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

export const linqMixin = {
    where(predicate) {
        return new WhereIterable(this.get(), predicate);
    },
    select(map) {
        return new SelectIterable(this.get(), map);
    },
    selectMany(map) {
        return new SelectManyIterable(this.get(), map);
    },
    take(count) {
        return new TakeIterable(this.get(), count);
    },
    skip(count) {
        return new SkipIterable(this.get(), count);
    },
    distinct(comparer) {
        return new DistinctIterable(this.get(), comparer);
    },
    ofType(type) {
        if (typeof type === 'string') {
            return new WhereIterable(this.get(), function (item) {
                return typeof item === type;
            });
        } else {
            return new WhereIterable(this.get(), function (item) {
                return item instanceof type;
            });
        }
    },
    groupBy(keySelector, elementSelector, resultCreator) {
        return new GroupIterable(this.get(), keySelector, elementSelector, resultCreator);
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
    first() {
        return FirstFinalizer.get(this.get());
    },
    firstOrDefault(def) {
        return FirstFinalizer.getOrDefault(this.get(), def);
    },
    firstOrThrow() {
        return FirstFinalizer.getOrThrow(this.get());
    },
    single() {
        return SingleFinalizer.get(this.get());
    },
    singleOrDefault(def) {
        return SingleFinalizer.getOrDefault(this.get(), def);
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
