import { IRouteItem } from "@/global/type/Route";

/**
 * 递归路由配置
 * @param route 路由项
 * @param prePath 前置路径
 */
export function deepRoute(route: IRouteItem, prePath: string | string[] = ""): IRouteItem[] {
    const { path: currPath, exact, childrens, roles, component } = route;
    let path: string | string[] = "";
    if (typeof prePath === "string" && typeof currPath === "string") {
        path = prePath + currPath;
    }
    if (prePath instanceof Array && currPath instanceof Array) {
        path = currPath.reduce((paths: string[], p: string) => {
            return [...paths, ...prePath.map((prep: string) => prep + p)];
        }, []);
    }
    if (typeof prePath === "string" && currPath instanceof Array) {
        path = currPath.map((p: string) => prePath + p);
    }
    if (prePath instanceof Array && typeof currPath === "string") {
        path = prePath.map((p: string) => p + currPath);
    }
	let realRoutes: IRouteItem[] = [];
	if (component !== undefined) {
		realRoutes.push({
			path,
			exact,
			roles,
			component,
		});
	}
	if (childrens instanceof Array && childrens.length > 0) {
		childrens.map((childRoute: IRouteItem) => {
			realRoutes = [...realRoutes, ...deepRoute(childRoute, path)];
		});
    }
	return realRoutes;
};

/**
 * 根据路由配置数组获取一维路由数组
 * @param routes 路由项
 */
export function flatRoute(routes: IRouteItem[]): IRouteItem[] {
    return routes.map((routeItem: IRouteItem) => deepRoute(routeItem)).reduce((prev: IRouteItem[] = [], curr: IRouteItem[]) => [...prev, ...curr]);
};
