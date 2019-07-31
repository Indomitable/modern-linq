import { applyMixin } from './utils';
import { SelectJsIterable } from './creation';
import { selectJsMixin } from './select-js-mixin';
import { WhereIterable } from './iterables/where';
import { SelectIterable } from './iterables/select';
import { SelectManyIterable } from './iterables/select-many';

applyMixin(SelectJsIterable, selectJsMixin);
applyMixin(WhereIterable, selectJsMixin);
applyMixin(SelectIterable, selectJsMixin);
applyMixin(SelectManyIterable, selectJsMixin);

export { fromIterable, fromObject } from './creation';
