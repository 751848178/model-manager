import { useSelector as reduxSelector } from "react-redux";

export default function useSelector<T = any>(selector: ReadonlyArray<string>): T {
	return reduxSelector((state: any) => {
		const [namespace, key] = selector;
		return state[namespace][key];
	});
}