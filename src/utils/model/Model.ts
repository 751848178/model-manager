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
	private baseAction: BaseAction<TState>;
	get action(): Readonly<TAction> & BaseAction<TState> {
		return {
			...this._action,
			...this.baseAction,
		};
	}

	private _reducers: Reducers<TState, TAction> = {} as Reducers<TState, TAction>;
	get reducers(): Readonly<Reducers<TState>> {
		return {
			[this.namespace]: (state: any = this.initialState, action: Action<keyof TAction>) => {
				const reducer = this._reducers[action.type];
				return reducer?.(state, action) || state;
			}
		};
	}

	private _effects: Effects<TAction> = {} as Effects<TAction>;
	get effects(): Readonly<Effects<TAction>> {
		return this._effects;
	}

	private _reducerFactory: ReducerFactory<TState, TAction & BaseAction<TState>> = new ReducerFactory<TState, TAction & BaseAction<TState>>();
	private _effectFactory: EffectFactory<TAction & BaseAction<TState>> = new EffectFactory<TAction & BaseAction<TState>>();

	constructor(options: ModelOption<TState, TAction>) {
		const { actions, namespace, initialState } = options;
		this.initialState = initialState;
		this.namespace = namespace;
		this._select = selectorFactory(namespace, initialState);
		this._action = actionFactory(namespace, actions);
		this.baseAction = actionFactory(namespace, (actionCreator) => {
			return {
				setState: actionCreator<Partial<TState>>("@@SET_STATE"),
				reset: actionCreator("@@RESET"),
			};
		});
		this.registerReducer((modelAction, factory) => {
			factory.register(modelAction.setState, (state, { payload }) => {
				return {
					...state,
					...payload,
				};
			}).register(modelAction.reset, () => {
				return {
					...this.initialState,
				};
			});
		});
	}

	registerReducer(reducerRegister: (actions: TAction & BaseAction<TState>, factory: ReducerFactory<TState, TAction & BaseAction<TState>>) => void): Model<TState, TAction> {
		reducerRegister(this.action, this._reducerFactory);
		this._reducers = this._reducerFactory.reducers;
		return this;
	};

	registerEffect(effectRegister: (actions: TAction & BaseAction<TState>, factory: EffectFactory<TAction & BaseAction<TState>>) => void): Model<TState, TAction> {
		effectRegister(this.action, this._effectFactory);
		this._effects = this._effectFactory.effects;
		return this;
	};
}