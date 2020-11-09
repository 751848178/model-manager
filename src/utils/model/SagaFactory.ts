import { CombinedState, combineReducers, Reducer } from "redux";
import { all, call, put, takeEvery } from "redux-saga/effects";

interface EffectsHandles {
	call: any;
	put: any;
}

type EffectFn = (payload: any, effects: EffectsHandles) => void;

interface Actions {
	[key: string]: any;
}

type ActionCreator = (action: string) => string;

type ReducerCallback = <S>(actions: Actions, factory: ReducerFactory<S>) => void;
type EffectCallback = (actions: Actions, factory: EffectFactory) => void;
type Effects = { [action: string]: () => Generator; };
type Reducers<S = {}> = { [action: string]: Reducer<S>; };


class ReducerFactory<S = {}> {
	constructor(private addReducer: (action: string, reducer: Reducer) => void) {}
	useReducer(action: string, reducer: Reducer): ReducerFactory<S> {
		this.addReducer(action, reducer);
		return this;
	}
}

class EffectFactory {
	constructor(private addEffect: (action: string, effect: EffectFn, takeCallback?: any) => void) { }
	useAction(action: string, effect: EffectFn, takeCallback?: any): EffectFactory {
		this.addEffect(action, effect, takeCallback || (() => {}));
		return this;
	};
}

interface ModuleOption<TAction extends Record<string, string> = any> {
	actions: (actionCreator: ActionCreator) => any;
	namespace: string;
}

class Module<S = {}> {
	namespace: string;
	select: Record<keyof S, ReadonlyArray<string>>;
	actions: Actions = {};
	private effects: Effects = {};
	private reducers: Reducers<S> = {};
	getEffects() {
		return this.effects;
	}
	getReducer() {
		return {
			[this.namespace]: (state: any = this.initialState, action: any) => {
				const reducer = this.reducers[action.type] || (() => {});
				return reducer(state, action) || state;
			}
		};
	}
	constructor(public initialState: S, options: ModuleOption) {
		const { actions, namespace } = options;
		this.namespace = namespace;
		this.select = Object.assign({}, ...Object.keys(initialState).map((key: string) => {
			return {[key]: [namespace, key]};
		}));
		const actionCreator: ActionCreator = (action: string) => {
			return `${namespace}_${action}`;
		}
		this.actions = actions(actionCreator);
	}
	private addReducer = (action: string, reducer: Reducer) => {
		const _reducer: Reducer = (state: S, _action: any) => {
			if (_action.type !== action) return state;
			const newState = reducer(state, _action);
			return newState;
		}
		this.reducers[action] = _reducer;
	}
	registerReducer(callback: ReducerCallback): Module<S> {
		callback(this.actions, new ReducerFactory<S>(this.addReducer));
		return this;
	};
	registerEffect(callback: EffectCallback): Module<S> {
		const addEffect = (action: string, effect: EffectFn, takeCallback?: any) => {
			const reducerAction = `reducer_${action}`
			function* _effect() {
				yield (takeEvery || takeCallback)(action, function* (payload: any) {
					function* _put(data: any) {
						return yield put({
							type: reducerAction,
							payload: data,
						});
					}
					yield effect(payload, {
						put: _put,
						call,
					});
				});
			}
			this.effects[action] = _effect;
			this.addReducer(reducerAction, (state: any, { payload }) => {
				return {
					...state,
					...payload
				}
			});
		}
		callback(this.actions, new EffectFactory(addEffect));
		return this;
	};
}

interface SagaFactory {
	modules: Module<any>[];
	registerModule: <S>(initialState: S, options: ModuleOption) => Module<S>;
	getReducers: () => CombinedState<any>;
	getEffects: () => any;
}

export const sagaFactory: SagaFactory = {
	modules: [],
	registerModule<S>(initialState: S, options: ModuleOption): Module<S> {
		const module = new Module(initialState, options);
		this.modules.push(module);
		return module;
	},
	getReducers(): CombinedState<any> {
		const reducers: Reducers[] = this.modules.map((module: Module) => module.getReducer());
		return combineReducers(Object.assign({}, ...reducers));
	},
	getEffects(): any {
		const effects: Effects[] = this.modules.map((module: Module) => module.getEffects());
		return function* () {
			yield all(
				effects
					.map(effect => Object.values(effect))
					.flat()
					.map(effect => effect())
			);
		};
	}
};