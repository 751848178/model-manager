import { Reducer } from "redux";
import { ActionGenerator } from "./Action";
import { Dictionary } from "./typing";

export type ReducerAction<TAction> = keyof TAction | '@@SET_STATE' | '@@RESET';

const constActions = {
	'@@SET_STATE': <TState>(state: TState, _action: any) => {
		if (_action.type !== '@@SET_STATE') {
			return state;
		}
		return {
			...state,
			..._action.payload,
		};
	},
	'@@RESET': <TState>(state: TState, _action: any) => {
		if (_action.type !== '@@RESET') {
			return state;
		}
		return {
			...state,
			..._action.payload,
		};
	},
};

// export type ReducerRegister<TState, TAction> = <TState, TAction>(actions: TAction, factory: ReducerFactory<TState, TAction>) => void;
export type Reducers<TState = Dictionary, TAction = Dictionary<Record<string, ActionGenerator<any, any>>>> = { [action in ReducerAction<TAction>]: Reducer<TState>; };

export class ReducerFactory<TState, TAction> {

	private _reducers: Reducers<TState, TAction> = {} as Reducers<TState, TAction>;
	get reducers() {
		return this._reducers;
	}

	constructor() {
		this._reducers = {
			...this._reducers,
			...constActions,
		}
	}

	register(modelAction: ActionGenerator<any, any>, reducer: Reducer<TState>): ReducerFactory<TState, TAction> {
		const { type } = modelAction();
		const _reducer: Reducer = (state: TState, _action: any) => {
			if (_action.type !== type) {
				return state;
			}
			const newState = reducer(state, _action);
			return newState;
		}
		this._reducers[<keyof TAction>type] = _reducer;
		return this;
	}
}