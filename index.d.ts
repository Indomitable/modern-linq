declare module 'selectjs' {
    export interface SelectJsIterable<TValue> extends Iterable<TValue> {
        where(predicate: (item: TValue) => TValue): SelectJsIterable<TValue>;
        select<TOutput>(map: (item: TValue) => TOutput): SelectJsIterable<TOutput>;
        selectMany<TOutput>(map: (item: TValue) => TOutput[]): SelectJsIterable<TOutput>;
        take(count: number): SelectJsIterable<TValue>;
        skip(count: number): SelectJsIterable<TValue>;
        ofType(type: string): SelectJsIterable<TValue>;
        ofType<TOutput extends TValue>(type: typeof TOutput): SelectJsIterable<TOutput>;

        toArray(): TValue[];
        first(): TValue | undefined;
        firstOrDefault(def: TValue): TValue;
        single(): TValue;
        singleOrDefault(def: TValue): TValue;
    }

    export function fromIterable<TValue>(iterable: Iterable): SelectJsIterable<TValue>;
    export function fromObject<TValue extends {}>(value: TValue): SelectJsIterable<['string', object][]>;
    export function range(from: number, to: number): SelectJsIterable<number>;
}
