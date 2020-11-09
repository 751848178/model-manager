import { useSelector } from 'react-redux';
import { TSelectorMapping } from './typing';


class Module<TState extends Record<string, any> = {}, TActions = {}> {
	namespace: string = '';
	private _select: (keyof TState)[] = [];
	get select(): TSelectorMapping<TState> {
		const selectorArr: TSelectorMapping<TState>[] = this._select.map((key) => {
			const itemSelector: TSelectorMapping<TState> = {
				[key]: <TSelector = unknown>(state: TState): TSelector => {
					return state?.[this?.namespace || '']?.[key];
				},
			} as TSelectorMapping<TState>;
			return itemSelector;
		});
		return Object.assign({}, ...selectorArr);
	};

	private _action: TActions = {};
	get action(): TActions {
		{
			[key: string]: (params: string, meta: { resolve: (res: any) => void, reject: (err: any) => void}) => {

			}
		};
		return {};
	}

	private actionCreator<TParams, TMeta>(actionName: string): Actions {
		return () => {};
	}
	private effects: Effects = {}
	private reducers: Reducers<S> = {};
	getEffects() {
		return this.effects;
	}
	getReducer() {
		return {
			[this.namespace]: (state: any = this.initialState, action: any) => {
				const reducer = this.reducers[action.type] || (() => void 0);
				return reducer(state, action) || state;
			}
		};
	}
	constructor(public initialState: S, options: ModuleOption) {
		const { actions, namespace } = options;
		this.namespace = namespace;
		this._select = Object.assign({}, ...Object.keys(initialState).map((key: string) => {
			return { [key]: [namespace, key] };
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