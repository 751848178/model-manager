import { ComponentType } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IRouteAuthRes } from "@/components/AuthRoute";

export interface IRouteConfig {
	prefix: string; // 路由前缀
	routes: IRouteItem[]; // 路由数组
	routeAuth?: (role: number, roles: number[]) => IRouteAuthRes; // 路由鉴权
}

export interface IRouteItem {
	path: string | string[]; // 路径
	exact?: boolean; // 精确匹配
	component?: ComponentType<RouteComponentProps<any>> | ComponentType<any>; // 组件
	childrens?: IRouteItem[]; // 路由数据
	roles?: number[]; // 权限
	routeAuth?: (role: number, roles: number[]) => IRouteAuthRes; // 没有权限的情况下的处理
}
