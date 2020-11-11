import { ActionCreator, CreateAction } from "./ActionCreater";


export type Dictionary<T = {}> = {
	[P in keyof T]: T[P];
}

export type DefaultAction<TAction = any> = {
	[P in keyof TAction]: TAction[P];
}

export type TSelectorMapping<TState = Dictionary> = Record<keyof TState, <S, R>(state: S) => R>;

export interface ModelOption<TState, TAction> {
	initialState: TState;
	namespace: string;
	actions: ActionCreator<TAction>;
}