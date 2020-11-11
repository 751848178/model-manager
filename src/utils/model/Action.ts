import { Action } from "redux";

export type ActionCreator<TAction> = (createAction: CreateAction) => TAction;

export type ReturnAction<TPayload = {}, TMeta = {}> = Action<string> & {
	payload: TPayload,
	meta: TMeta,
};

export type ActionGenerator<TPayload, TMeta> = (payload: TPayload, meta: TMeta) => ReturnAction<TPayload, TMeta>

export type CreateAction = <TPayload = {}, TMeta = {}>(type: string) => ActionGenerator<TPayload, TMeta>;

export function createAction<TPayload, TMeta>(type: string): ActionGenerator<TPayload, TMeta> {
	return (payload: TPayload, meta: TMeta): ReturnAction<TPayload, TMeta> => {
		return {
			type,
			payload,
			meta,
		}
	}
}

export function actionFactory<TAction>(actionCreator: ActionCreator<TAction>): TAction {
	let action = {} as TAction;
	if (typeof actionCreator === 'function') {
		action = actionCreator(createAction);
	}
	return action;
}


/* Type inference test */
const action = actionFactory((createAction: CreateAction) => {
	return {
		setAge: createAction<number>('setAge')
	};
});
/* End Type inference test */