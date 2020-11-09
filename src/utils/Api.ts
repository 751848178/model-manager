import { ApiOption, IApi, Method } from "@/global/type/Api";
import { post, get } from "./request";

let apiOptions: ApiOption = {
	prefix: "",
};

export const Api: IApi = <Res, Req>(url: string, method: Method): (params: Req) => Promise<Res> => {
	if (!url) throw "The parameter URL cannot be empty.";
	const { prefix } = apiOptions;
	let realUrl: string = "";
	if (prefix && prefix.lastIndexOf("/") !== -1 && prefix.lastIndexOf("/") === prefix.length - 1) {
		realUrl += prefix.substring(0, prefix.length - 2);
	} else {
		realUrl += prefix;
	}
	if (url && url.indexOf("/") === 0) {
		realUrl += `/${url.substring(1, url.length - 1)}`;
	} else {
		realUrl += `/${url}`;
	}
	return (params: Req): Promise<Res> => {
		return new Promise<Res>(async (resolve, reject) => {
			let res: Res = {} as Res;
			try {
				if (method === "GET") {
					res = await get<Res>(url);
				}
				if (method === "POST") {
					res = await post<Res, Req>(realUrl, params);
				}
			} catch (error) {
				reject(error);
			}
			resolve(res);
		});
	};
}

Api.init = (options: ApiOption) => {
	const { prefix } = options;
	apiOptions = {
		prefix,
	};
}