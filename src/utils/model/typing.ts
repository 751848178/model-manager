


export type TSelectorMapping<TState = {}> = Record<keyof TState, <TSelected = unknown>(state: TState) => TSelected>;

export type TAction = <T>() => {};