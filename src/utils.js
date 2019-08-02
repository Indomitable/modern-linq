/**
 * Apply mixin to a class
 * @param {object} mixin
 * @param {Function[]} destinations
 */
export function applyMixin(mixin, destinations) {
    for (const dest of destinations) {
        Object.assign(dest.prototype, mixin);
    }
}
