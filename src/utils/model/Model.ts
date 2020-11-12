import { Action } from 'redux';
import { put } from 'redux-saga/effects';
import { actionFactory, ActionGenerator } from './Action';
import { EffectFactory, EffectRegister, Effects } from './Effect';
import { ReducerFactory, ReducerRegister, Reducers } from './Reducer';
import { SelectMap, selectorFactory } from './Selector';
import { Dictionary, ModelOption } from './typing';


export class Model<TState = Dictionary, TAction = Dictionary<Record<string, ActionGenerator>>> {
	private initialState: TState = {} as TState;
	private namespace: string = '';
	private _select: SelectMap<TState>;
	get select(): Readonly<SelectMap<TState>> {
		return this._select;
	};

	private _action: Readonly<TAction> = {} as TAction;
	get action(): Readonly<TAction> {
		return this._action;
	}

	private _reducers: Reducers<TState, TAction> = {} as Reducers<TState, TAction>;
	get reducers(): Readonly<Reducers<TState>> {
		return {
			[this.namespace]: (state: any = this.initialState, action: Action<keyof TAction>) => {
				const reducer = this._reducers[action.type] || (() => void 0);
				return reducer(state, action) || state;
			}
		};
	}

	private _effects: Effects<TAction> = {} as Effects<TAction>;
	get effects(): Readonly<Effects<TAction>> {
		return this._effects;
	}

	constructor(options: ModelOption<TState, TAction>) {
		const { actions, namespace, initialState } = options;
		this.initialState = initialState;
		this.namespace = namespace;
		this._select = selectorFactory(namespace, initialState);
		this._action = actionFactory(actions);
	}

	setState<TPayload>(payload: TPayload) {
		return {
			type: 'SET_STATE',
			payload,
		}
	}

	registerReducer(reducerRegister: ReducerRegister): Model<TState, TAction> {
		const reducerFactory = new ReducerFactory<TState, TAction>();
		reducerRegister<TState, TAction>(this.action, reducerFactory);
		this._reducers = reducerFactory.reducers;
		return this;
	};

	registerEffect(effectRegister: EffectRegister): Model<TState, TAction> {
		const effectFactory = new EffectFactory<TAction>();
		effectRegister<TAction>(this.action, effectFactory);
		this._effects = effectFactory.effects;
		return this;
	};

	reset() {
		put(this.setState(this.initialState));
	}
}