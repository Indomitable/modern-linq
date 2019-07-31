import { WhereIterable } from "./iterables/where";
import { SelectIterable } from "./iterables/select";

export const selectJsMixin = {
    where(predicate) {
        return new WhereIterable(this, predicate);
    },

    select(map) {
        return new SelectIterable(this, map);
    }
}
