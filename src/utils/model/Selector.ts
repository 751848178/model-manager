import { Dictionary } from "./typing";



export type SelectMap<TState> = { [P in keyof TState]: (state: TState) => TState[keyof TState] }

export function selectorFactory<T>(namespace: string, initialState: Dictionary<T>): SelectMap<T> {
	let selector = {} as SelectMap<T>;
	for (const key in initialState) {
		selector[key] = (globalState: any): T[keyof T] => {
			const state: T = globalState?.[namespace || ''];
			return state?.[key] as T[keyof T];
		};
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