export class AggregateFinalizer {
    static get(source, accumulator) {
        if (Array.isArray(source)) {
            return source.reduce(accumulator);
        }
    }

    static getWithInital(source, accumulator, initial) {
        if (Array.isArray(source)) {
            return source.reduce(accumulator, initial);
        }
    }

    static getWithResultCreator(source, accumulator, initial, resultCreator) {
        if (Array.isArray(source)) {
            return resultCreator(source.reduce(accumulator, initial));
        }
    }
}
