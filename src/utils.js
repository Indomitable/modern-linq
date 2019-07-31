/**
 * Apply mixin to a class
 * @param {Function} destination 
 * @param {Function} mixin 
 */
export function applyMixin(destination, mixin) {
    for (const prop in mixin) {
        if (prop === 'constructor' || !mixin.hasOwnProperty(prop)) {
            continue;
        }
        destination.prototype[prop] = mixin[prop];
    }
}
