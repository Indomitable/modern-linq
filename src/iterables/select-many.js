import "core-js/stable";
import "regenerator-runtime/runtime";

/**
 * Return flatten mapped array [[1, 2], [3, 4]].selectMany(x => x) === [1, 2, 3, 4, 5]
 */
export class SelectManyIterable {
	/**
	 * 
	 * @param {Iterable} source 
	 * @param {Function} map 
	 */
    constructor(source, map) {
		this.source = source;
		this.map = map;
    }
    
    *__generator(source, map) {
        for (const item of source) {
            const arr = map(item);
            for (const subItem of arr) {
                yield subItem;
            }
        }
    }

	[Symbol.iterator]() {
        return this.__generator(this.source, this.map);
    }
}
