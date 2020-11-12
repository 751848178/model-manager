import { ActionCreator, CreateAction } from "./Action";


export type Dictionary<T = {}> = {
	[P in keyof T]: T[P];
}

export interface ModelOption<TState, TAction> {
	initialState: TState;
	namespace: string;
	actions: ActionCreator<TAction>;
}

// export type ModelAction<TAction, TActionKey extends keyof TAction> = TAction[TActionKey];