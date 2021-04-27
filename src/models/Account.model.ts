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

const accountModule = new Model({
	initialState,
	namespace: "account",
	actions: (actionCreator) => {
		return {
			fetchLogin: actionCreator<UserInfo>("login"),
			fetchLogout: actionCreator("logout"),
		};
	}
}).registerReducer((modelAction, factory) => {
	factory.register(modelAction.fetchLogin, (state, { payload }) => {
		return {
			...state,
			userInfo: payload
		};
	});
}).registerEffect((modelAction, factory) => {
	factory.register(modelAction.fetchLogout, function* (payload, { put }) {
		yield new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 3000);
		});
		
		yield put(modelAction.setState({
			userInfo: {
				username: "",
				password: "",
				nickname: "",
			}
		}));
	});
});

export default accountModule;