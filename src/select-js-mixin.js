import { WhereIterable } from "./iterables/where";
import { SelectIterable } from "./iterables/select";
import { SelectManyIterable } from "./iterables/select-many";

export const selectJsMixin = {
    where(predicate) {
        return new WhereIterable(this, predicate);
    },

    select(map) {
        return new SelectIterable(this, map);
    },

    selectMany(map) {
        return new SelectManyIterable(this, map);
    },

    ofType(type) {
        if (typeof type === 'string') {
            return new WhereIterable(this, function (item) { return typeof item === type; } );
        } else {
            return new WhereIterable(this, function (item) { return item instanceof type; } );
        }
    }
}
