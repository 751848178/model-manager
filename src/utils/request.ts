import { Method, Result } from "@/global/type/Api";
// import objUtils from "./object.util";
// import browserUtils from "./browser.utils";
import { local } from "./Storage";

let opts = {}; // 请求相关配置信息
let ctrls: {
	message: {
		error: Function;
	}
} = {
	message: {
		error: (error: string) => {
			console.error(error);
		}
	}
}; // 请求结束后通用的处理操作所依赖的控件

const JSON_HEADER_CONF = {
    "Accept": "application/json",
    "Content-Type": "application/json",
};

const JSON_HEADER = new Headers(JSON_HEADER_CONF);

interface IHeaders extends Headers {
	Authorization?: string;
}

interface IParams {
	method?: Method;
	body?: any;
	headers?: IHeaders;
}

export async function post<R, P = {}>(url: string, params: P): Promise<R> {
    let token = local.get("token");
    let headers = JSON_HEADER;
    if (token) {
        headers = Object.assign({}, JSON_HEADER, {
            Authorization: "Bearer " + token
        });
    }
    let param: IParams = {
        method: "POST",
        headers,
    };
    if(params) param.body = JSON.stringify(params);
    let res: Result<R> = await fetch(url, param).then((response) => {
        // ok代表状态码在200-299
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    }).catch(err => {
        ctrls.message.error(err.toString());
    });
    return res.data;
};

export async function get<R>(url: string): Promise<R> {
    let token = local.get("token");
    let headers = JSON_HEADER;
    if (token) {
        headers = Object.assign({}, JSON_HEADER, {
            Authorization: "Bearer " + token
        });
    }
    let opts: IParams = {
		method: "GET",
		headers,
    };
    let res: Result<R> = await fetch(url, opts).then((response) => {
        // ok代表状态码在200-299
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    }).catch(err => {
        ctrls.message.error(err.toString());
    });
    return res.data;
};


// End 证件相关

/***
 * 创建请求对象
 * @param options 请求相关配置信息
 * @param controllers 请求结束后通用的处理操作所依赖的控件
 * @returns {{getCategoryList: (function(*)), getGoodsList: (function(*=)), getGoodsListByCode: (function(*=)), uploadImgs: (function(*=)), savePageSetting: (function({settings: *, pageName: *, beginTime: *, endTime: *, activityId: *})), getPages: (function()), getPageByIdOrName: (function({id: *, name: *})), addImageGroup: (function(*=)), removePageById: (function({id: *})), autoLogin: (function(*=))}} 返回请求对象
 */
export default (options: any, controllers: any) => {
    opts = options;
    ctrls = controllers;
    return {
        post,
        get,
    };
};
