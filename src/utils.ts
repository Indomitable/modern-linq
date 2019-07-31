export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.property[name] = Object.getOwnPropertyDescriptor(baseCtor.property, name);
        });
    });
}
