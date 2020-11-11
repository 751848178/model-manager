import { UserInfo } from "@/global/type/Account";
import { Model } from "@/utils/model/Model";

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

const AccountModule = new Model({
	initialState,
	namespace: "account",
	actions: (actionCreator) => {
		return {
			fetchLogin: actionCreator("login"),
			fetchLogout: actionCreator("logout"),
		};
	}
})/* .registerReducer((moduleAction, factory) => {
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
}) */;

AccountModule.select.userInfo;
AccountModule.action.fetchLogin;

export default AccountModule;