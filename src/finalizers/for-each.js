export class ForEachFinalizer {
    static get(source, action) {
        for (const item of source) {
            action(item);
        }
    }
}
