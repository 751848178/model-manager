import React from "react";
import { Route, RouteProps } from "react-router-dom";
import { PageRole } from "@/global/enum/role";

interface IAuthRouteProp extends RouteProps {
    roles?: number[];
    role?: number;
    routeAuth?: (role: number, roles: number[]) => IRouteAuthRes;
}

export interface IRouteAuthRes {
    hasPermissions: boolean;
    failedHandler: () => void;
};
/**
 * 验证是否有路由权限
 * @param role 当前权限
 * @param roles 路由权限
 */
export function routeAuth(role: number, roles: number[]): IRouteAuthRes {
    let authRes: IRouteAuthRes = {
        hasPermissions: false,
        failedHandler: () => { },
    };
    if (roles.includes(PageRole.All) || roles.includes(role)) {
        authRes.hasPermissions = true;
        return authRes;
    }
    if (role === PageRole.Logout) {
        authRes.failedHandler = () => (location.href = "/login"), null;
        return authRes;
    } else {
        authRes.failedHandler = () => null;
        return authRes;
    }
};

const AuthRoute = (props: IAuthRouteProp) => {
    const { roles = [], role = PageRole.Logout, routeAuth: auth = routeAuth } = props;

    let authRes = auth(role, roles);
    if (!authRes.hasPermissions) {
        authRes.failedHandler();
    }
    return (
        <Route {...props} />
    );
}

export default AuthRoute;
