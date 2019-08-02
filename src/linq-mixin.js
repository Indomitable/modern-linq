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
        const source = this.isResulted ? this.result : this;
        return new WhereIterable(source, predicate);
    },
    select(map) {
        const source = this.isResulted ? this.result : this;
        return new SelectIterable(source, map);
    },
    selectMany(map) {
        return new SelectManyIterable(this, map);
    },
    take(count) {
        const source = this.isResulted ? this.result : this;
        return new TakeIterable(source, count);
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
    toArray() {
        return this.isResulted ? this.result : Array.from(this);
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
        return new Set(this);
    },
    first() {
        return FirstFinalizer.get(this);
    },
    firstOrDefault(def) {
        return FirstFinalizer.getOrDefault(this, def);
    },
    firstOrThrow() {
        return FirstFinalizer.getOrThrow(this);
    },
    single() {
        return SingleFinalizer.get(this);
    },
    singleOrDefault(def) {
        return SingleFinalizer.getOrDefault(this, def);
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
        return AggregateFinalizer.getWithInitial(this, (r, i) => r + i, 0);
    },
    product() {
        return AggregateFinalizer.getWithInitial(this, (r, i) => r * i, 1);
    },
    join(separator) {
        return this.select(_ => '' + _).toArray().join(separator);
    }
};
