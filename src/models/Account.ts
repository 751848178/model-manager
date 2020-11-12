import { UserInfo } from "@/global/type/Account";
import { sagaFactory } from "@/utils/model.version.1/SagaFactory";

interface InitialState {
	userInfo: UserInfo;
}

const initialState: InitialState = {
	userInfo: {
		username: "",
		password: "",
		nickname: "xingbo",
	},
}

const AccountModule = sagaFactory.registerModule<InitialState>(initialState, {
	namespace: "account",
	actions: (actionCreator) => {
		return {
			fetchLogin: actionCreator("login"),
			fetchLogout: actionCreator("logout"),
		};
	}
}).registerReducer((moduleAction, factory) => {
	factory.useReducer(moduleAction.fetchLogin, (state, { payload }) => {
		return {
			...state,
			userInfo: payload
		};
	});
}).registerEffect((moduleAction, factory) => {
	factory.useAction(moduleAction.fetchLogout, function* (payload, { put }) {
		yield new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 3000);
		});
		yield put({
			userInfo: {
				username: "",
				password: "",
				nickname: "",
			}
		});
	});
});

export default AccountModule;