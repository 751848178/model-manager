import { Action, AnyAction } from "redux";

export type ActionCreator<TAction> = (createAction: CreateAction) => TAction;

export type BaseAction<TPayload> = {
	setState: (payload?: Partial<TPayload>) => ReturnAction<Partial<TPayload>, any>;
	reset: () => ReturnAction<TPayload, any>;
};

export type ReturnAction<TPayload extends any, TMeta extends any> = /* Partial<TPayload> &  */Action<string> & {
	meta?: TMeta | undefined;
};

export type ActionGenerator<TPayload extends any, TMeta extends any> = (payload?: TPayload, meta?: TMeta) => ReturnAction<TPayload, TMeta>

export type CreateAction = <TPayload extends any = unknown, TMeta extends any = unknown>(type: string) => ActionGenerator<TPayload, TMeta>;

export function createAction<TPayload, TMeta>(type: string): ActionGenerator<TPayload, TMeta> {
	return (payload?: TPayload, meta?: TMeta): ReturnAction<TPayload, TMeta> => {
		const action: ReturnAction<TPayload, TMeta> = {
			type,
			...payload,
		}
		if (meta) {
			action.meta = meta;
		}
		return action;
	}
}

export function createActionByNamespace(namespace: string) {
	return <TPayload, TMeta>(type: string): ActionGenerator<TPayload, TMeta> => createAction<TPayload, TMeta>(`${namespace}/${type}`);
}

export function actionFactory<TAction>(namespace: string, actionCreator: ActionCreator<TAction>): TAction {
	let action = {} as TAction;
	if (typeof actionCreator === 'function') {
		action = actionCreator(createActionByNamespace(namespace));
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