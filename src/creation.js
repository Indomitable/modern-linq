import RangeIterable from './generators/range';
import RepeatIterable from './generators/repeat';
import LinqIterable from './iterables/initial/linq';
import ArrayIterable from './iterables/initial/array';
import ArrayLikeIterable from './iterables/initial/array-like';
import ObjectIterable from './iterables/initial/object';

export function fromIterable(source) {
    return Array.isArray(source) ? new ArrayIterable(source) : new LinqIterable(source);
}

export function fromObject(obj, resultCreator) {
    return new ObjectIterable(obj, resultCreator);
}

/**
 * The object which has property length of type number and keys with names: '0', '1' ...
 * @param {ArrayLike} source
 */
export function fromArrayLike(source) {
    return new ArrayLikeIterable(source);
}

export function range(from, to) {
    return new RangeIterable(from, to);
}

export function repeat(value, times) {
    return new RepeatIterable(value, times);
}

export function from(source) {
    const iterator = source[Symbol.iterator];
    if (typeof iterator === 'function') {
        return fromIterable(source);
    }
    if ('length' in source) {
        return fromArrayLike(source);
    }
    return fromObject(source);
}
