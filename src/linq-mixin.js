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
            return new WhereIterable(this, function (item) { return typeof item === type; } );
        } else {
            return new WhereIterable(this, function (item) { return item instanceof type; } );
        }
    },
    toArray() {
        return Array.from(this);
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
}
