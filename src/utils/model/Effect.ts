import { all, call, put, takeEvery } from "redux-saga/effects";
import { ActionGenerator, ReturnAction } from "./Action";
import { Dictionary } from "./typing";

export interface EffectsHandles {
	call: any;
	put: any;
	all: any;
}

type EffectFn = (action: ReturnAction, effects: EffectsHandles) => void;

// export type EffectRegister = <TAction>(actions: TAction, factory: EffectFactory<TAction>) => void;
export type Effects<TAction = Dictionary<Record<string, ActionGenerator>>> = { [action in keyof TAction]: () => Generator; };

export class EffectFactory<TAction> {
	constructor() { }

	private _effects: Effects<TAction> = {} as Effects<TAction>;
	get effects() {
		return this._effects;
	}

	register(modelAction: ActionGenerator, effect: EffectFn, takeHandle?: any): EffectFactory<TAction> {
		const { type } = modelAction();
		function* _effect() {
			yield (takeHandle || takeEvery)(type, function* (payload: any) {
				function* _put(data: any) {
					return yield put({
						type,
						payload: data,
					});
				}
				yield effect(payload, {
					put: _put,
					call,
					all,
				});
			});
		}
		this._effects[<keyof TAction>type] = _effect;
		return this;
	};
}
