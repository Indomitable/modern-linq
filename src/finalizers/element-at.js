export class ElementAtFinalizer {
    static get(source, index) {
        let i = 0;
        for (const item of source) {
            if (i === index) {
                return item;
            }
            i++;
        }
    }
}