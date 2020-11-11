import { actionFactory, ActionGenerator } from './Action';
import { SelectMap, selectorFactory } from './Selector';
import { Dictionary, ModelOption } from './typing';


export class Model<TState = Dictionary, TActions = Dictionary<Record<string, ActionGenerator>>> {
	private initialState: TState = {} as TState;
	private namespace: string = '';
	private _select: SelectMap<TState>;
	get select(): Readonly<SelectMap<TState>> {
		return this._select;
	};

	private _action: Readonly<TActions> = {} as TActions;
	get action(): Readonly<TActions> {
		return this._action;
	}

	private _effects: Effects = {}
	get effects(): Readonly<Effects> {
		return this._effects;
	}
	private _reducers: Reducers<TState> = {};
	get reducers(): Readonly<Reducers<TState>> {
		return {
			[this.namespace]: (state: any = this.initialState, action: any) => {
				const reducer = this._reducers[action.type] || (() => void 0);
				return reducer(state, action) || state;
			}
		};
	}
	constructor(options: ModelOption<TState, TActions>) {
		const { actions, namespace, initialState } = options;
		this.initialState = initialState;
		this.namespace = namespace;
		this._select = selectorFactory(namespace, initialState);
		this._action = actionFactory(actions);
	}
	private addReducer = (action: string, reducer: Reducer) => {
		const _reducer: Reducer = (state: TState, _action: any) => {
			if (_action.type !== action) return state;
			const newState = reducer(state, _action);
			return newState;
		}
		this.reducers[action] = _reducer;
	}
	registerReducer(callback: ReducerCallback): Model<TState> {
		callback(this.actions, new ReducerFactory<TState>(this.addReducer));
		return this;
	};
	registerEffect(callback: EffectCallback): Model<TState> {
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