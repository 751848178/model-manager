
export type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface Result<T> {
	data: T;
	msg: string;
	code: number;
}

export interface ApiOption {
	prefix?: string;
}

export interface IApi {
	<Res, Req>(url: string, method: Method): (params: Req) => Promise<Res>;
	init: (options: ApiOption) => void;
}