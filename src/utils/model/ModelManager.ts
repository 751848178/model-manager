import { CombinedState, combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { Effects } from "./Effect";
import { Model } from "./Model";
import { Reducers } from "./Reducer";


interface ModelManager {
	models: Model[];
	registerModel: (models: Model[]) => void;
	getReducers: () => CombinedState<any>;
	getEffects: () => any;
}

export const modelManager: ModelManager = {
	models: [],
	registerModel(models: Model[]) {
		this.models = [
			...this.models,
			...models
		];
	},
	getReducers(): CombinedState<any> {
		const reducers: Reducers[] = this.models.map((module: Model) => module.reducers);
		return combineReducers(Object.assign({}, ...reducers));
	},
	getEffects(): any {
		const effects: Effects[] = this.models.map((module: Model) => module.effects);
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