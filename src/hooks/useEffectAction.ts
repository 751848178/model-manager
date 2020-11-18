import { ActionGenerator } from "@/utils/model/Action";
import { DependencyList, useCallback } from "react";
import { useDispatch } from "react-redux";


export function useEffectActionVersion1(action: string, deps: DependencyList = []) {
	const dispatch = useDispatch();
	const dispatchAction = useCallback((data?: any) => {
		return dispatch({
			type: action,
			payload: data,
		});
	}, [dispatch, ...deps]);
	return [dispatchAction];
}

export default function useEffectAction(action: ActionGenerator, deps: DependencyList = []) {
	const dispatch = useDispatch();
	const dispatchAction = useCallback((data?: any) => {
		return dispatch(action(data));
	}, [action, dispatch, ...deps]);
	
	return [dispatchAction];
}