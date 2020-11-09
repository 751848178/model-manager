
// export * from "./request";
// export { default as http } from "./request";
export { default as storage } from "./Storage";
export * from "./Storage";
export * from "./Api";

/**
 * 根据指定类型获取值
 * @param val 修改类型的值
 */
export function convert<T>(val: any): T{
	return <T>val;
}

/**
 * 获取精确到秒的时间戳
 * @param date 日期
 */
export function timestampWithSecond(date?: Date) {
	return parseInt(String((date || new Date()).valueOf() / 1000));
}

/**
 * 生成随机32位hash
 */
export function guid2() {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4() + `_${timestampWithSecond()}`);
}

/**  
 * 日期格式化  
 * @param date 日期
 * @param formatStr 格式模版
 * @returns 日期字符串  
 */
export function dateFormat (date: Date = new Date(), formatStr: string) {
	let regObj = {
		"M+": date.getMonth() + 1,                 //月份 
		"d+": date.getDate(),                    //日 
		"h+": date.getHours(),                   //小时 
		"m+": date.getMinutes(),                 //分 
		"s+": date.getSeconds(),                 //秒 
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度 
		"S": date.getMilliseconds()             //毫秒 
	};
	if (/(y+)/.test(formatStr)) {
		formatStr = formatStr.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	Object.entries(regObj).map((item: any) => {
		let [key, value] = item;
		if (new RegExp("(" + key + ")").test(formatStr)) {
			formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? value : (("00" + value).substr(("" + value).length)));
		}
	});
	return formatStr;
} 