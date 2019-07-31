/**
 * Return flatten mapped array [[1, 2], [3, 4]].selectMany(x => x) === [1, 2, 3, 4, 5]
 */
export class SelectManyIterable {
	/**
	 * 
	 * @param {Iterable} source 
	 * @param {Function} extract 
	 */
    constructor(source, extract) {
		this.source = source;
		this.extract = extract;
    }

	[Symbol.iterator]() {
		const iterator = this.source[Symbol.iterator]();
        const extract = this.extract;
        let isSubDone = true;
        let subIterator = null;
		return {
			next() {
                const item = getNextItem(iterator, extract, subIterator, isSubDone);
                isSubDone = item.sdone;
                subIterator = item.sIterator;
                return item.value;
			}
		};
    }
}


function getSecondaryIterator(mainIterator, extract) {
    const mainItem = mainIterator.next();
    if (mainItem.done) {
        return {
            final: true
        };
    }
    const secondaryIterator = extract(mainItem.value)[Symbol.iterator]();
    const secondaryItem = secondaryIterator.next();
    if (secondaryItem.done) {
        return getSecondaryIterator(mainIterator, extract);
    }
    return { iterator: secondaryIterator, first: secondaryItem.value, final: false };
}

function getNextItem(mainIterator, extract, subIterator, isSubDone) {
    if (isSubDone) {
        const { iterator, first, final } = getSecondaryIterator(mainIterator, extract);
        if (final) {
            return { value: { done: true } };
        }
        return { value: { done: false, value: first }, sIterator: iterator, sdone: false };
    } else {
        const snext = subIterator.next();
        if (snext.done) {
            return getNextItem(mainIterator, extract, null, true);
        }
        return { value: { done: false, value: snext.value }, sIterator: subIterator, sdone: false }; 
    }
}
