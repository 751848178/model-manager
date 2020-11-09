import { DependencyList, useCallback } from "react";
import { useDispatch } from "react-redux";


export default function useEffectAction(action: string, deps: DependencyList = []) {
	const dispatch = useDispatch();
	const dispatchAction = useCallback((data?: any) => {
		return dispatch({
			type: action,
			payload: data,
		});
	}, [dispatch, ...deps]);
	return [dispatchAction];
}