import { applyMixin } from './utils';
import { SelectJsIterable } from './creation';
import { selectJsMixin } from './select-js-mixin';
import { WhereIterable } from './iterables/where';


applyMixin(SelectJsIterable, selectJsMixin);
applyMixin(WhereIterable, selectJsMixin);

export { toSelectIterable as toSelect } from './creation';
