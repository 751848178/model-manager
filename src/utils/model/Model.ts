import { Action } from 'redux';
import { put } from 'redux-saga/effects';
import { actionFactory, ActionGenerator, BaseAction } from './Action';
import { EffectFactory, Effects } from './Effect';
import { ReducerFactory, Reducers } from './Reducer';
import { SelectMap, selectorFactory } from './Selector';
import { Dictionary, ModelOption } from './typing';


export class Model<TState = Dictionary, TAction = Dictionary<Record<string, ActionGenerator<any, any>>>> {
	private initialState: TState = {} as TState;
	private namespace: string = '';
	private _select: SelectMap<TState>;
	get select(): Readonly<SelectMap<TState>> {
		return this._select;
	};

	private _action: Readonly<TAction> = {} as TAction;
	private baseAction: BaseAction<any>;
	get action(): Readonly<TAction> & BaseAction<any> {
		return {
			...this._action,
			...this.baseAction,
		};
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
		this.baseAction = actionFactory((actionCreator) => {
			return {
				setState: actionCreator<any>("@@SET_STATE"),
				reset: actionCreator("@@RESET"),
			};
		});
	}

	registerReducer(reducerRegister: (actions: TAction & BaseAction<any>, factory: ReducerFactory<TState, TAction & BaseAction<any>>) => void): Model<TState, TAction> {
		const reducerFactory = new ReducerFactory<TState, TAction & BaseAction<any>>();
		reducerRegister(this.action, reducerFactory);
		this._reducers = reducerFactory.reducers;
		return this;
	};

	registerEffect(effectRegister: (actions: TAction & BaseAction<any>, factory: EffectFactory<TAction & BaseAction<any>>) => void): Model<TState, TAction> {
		const effectFactory = new EffectFactory<TAction & BaseAction<any>>();
		effectRegister(this.action, effectFactory);
		this._effects = effectFactory.effects;
		return this;
	};
}