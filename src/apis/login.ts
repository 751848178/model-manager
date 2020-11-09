import { Api } from "@/utils/Api";

interface LoginReq {
	username: string;
	password: string;
}

interface LoginRes {
	token: string;
}

const Account = {
	login: Api<LoginRes, LoginReq>("account/login", "POST"),
}


export {
	Account,
}

export default {
	Account,
}