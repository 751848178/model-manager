import { Dictionary } from "./typing";


export type SelectMap<TState = Dictionary> = Record<keyof TState, <S, R>(state: S) => R>;

export function selectorFactory<T>(namespace: string, initialState: Dictionary<T>): Record<keyof T, <S, R>(state: S) => R> {
	let selector = {} as Record<keyof T, <S, R>(state: S) => R>;
	for (const key in initialState) {
		selector[key] = <S, R>(globalState: any) => {
			const state = globalState?.[namespace || ''];
			return state?.[key] as S;
		}
	}
	return selector;
}


/* Type inference test *
const selector = selectorFactory('test', {
	age: {
		get() {
			return (this as any).age;
		},
		set(age: number) {
			(this as any).age = age;
		}
	}
});
/* End Type inference test */