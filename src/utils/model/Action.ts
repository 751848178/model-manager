import { Action, AnyAction } from "redux";

export type ActionCreator<TAction> = (createAction: CreateAction) => TAction;

export type BaseAction<TPayload> = {
	setState: (payload?: TPayload) => AnyAction;
	reset: () => AnyAction;
};

export type ReturnAction<TPayload extends any, TMeta extends any> = Action<string> & {
	payload: TPayload | undefined,
	meta: TMeta | undefined,
};

export type ActionGenerator<TPayload extends any, TMeta extends any> = (payload?: TPayload, meta?: TMeta) => ReturnAction<TPayload, TMeta>

export type CreateAction = <TPayload extends any = unknown, TMeta extends any = unknown>(type: string) => ActionGenerator<TPayload, TMeta>;

export function createAction<TPayload, TMeta>(type: string): ActionGenerator<TPayload, TMeta> {
	return (payload?: TPayload, meta?: TMeta): ReturnAction<TPayload, TMeta> => {
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


/* Type inference test *
const action = actionFactory((createAction: CreateAction) => {
	return {
		setAge: createAction<number>('setAge')
	};
});
/* End Type inference test */