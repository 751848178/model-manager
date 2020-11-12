import { all, call, put, takeEvery } from "redux-saga/effects";
import { ActionGenerator } from "./Action";
import { Dictionary } from "./typing";

interface EffectsHandles {
	call: any;
	put: any;
	all: any;
}

type EffectFn = (payload: any, effects: EffectsHandles) => void;

export type EffectRegister = <TAcion>(actions: TAcion, factory: EffectFactory<TAcion>) => void;
export type Effects<TAcion = Dictionary<Record<string, ActionGenerator>>> = { [action in keyof TAcion]: () => Generator; };

export class EffectFactory<TAcion> {
	constructor() { }

	private _effects: Effects<TAcion> = {} as Effects<TAcion>;
	get effects() {
		return this._effects;
	}

	register(action: keyof TAcion, effect: EffectFn, takeHandle?: any): EffectFactory<TAcion> {
		function* _effect() {
			yield (takeHandle || takeEvery)(action, function* (payload: any) {
				yield effect(payload, {
					put,
					call,
					all,
				});
			});
		}
		this._effects[action] = _effect;
		return this;
	};
}
