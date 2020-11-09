import { PageRole } from "@global/enum/Role";
import { IRouteConfig } from "@/global/type/Route";
import Valuation from "@/pages/Index";
import Login from "@/pages/Login";

const Route: IRouteConfig = {
    prefix: "",
    routes: [
        {
            path: "/login",
            // exact: true,
            component: Login,
            roles: [PageRole.Logout],
        },
        {
            path: "/index",
            exact: true,
            component: Valuation,
            roles: [PageRole.All],
        },
        {
            path: "/subject",
            exact: true,
            childrens: [
                {
                    path: "/list",
                    exact: true,
                    // component: SubjectList,
                    roles: [PageRole.All],
                },
                {
                    path: ["/edit", "/add"],
                    exact: true,
                    // component: SubjectEdit,
                    roles: [PageRole.All],
                },
            ]
        },
        {
            path: "/course",
            exact: true,
            childrens: [
                {
                    path: "/list",
                    exact: true,
                    // component: CourseList,
                    roles: [PageRole.All],
                },
                {
                    path: ["/edit", "/add"],
                    exact: true,
                    // component: CourseEdit,
                    roles: [PageRole.All],
                },
            ]
        },
        {
            path: "/grade",
            exact: true,
            childrens: [
                {
                    path: "/list",
                    exact: true,
                    // component: GradeList,
                    roles: [PageRole.All],
                },
                {
                    path: ["/edit", "/add"],
                    exact: true,
                    // component: GradeEdit,
                    roles: [PageRole.All],
                },
            ]
        },
        {
            path: "/type",
            exact: true,
            childrens: [
                {
                    path: "/list",
                    exact: true,
                    // component: TypeList,
                    roles: [PageRole.All],
                },
                {
                    path: ["/edit", "/add"],
                    exact: true,
                    // component: TypeEdit,
                    roles: [PageRole.All],
                },
            ]
        },
        {
            path: "/",
            exact: true,
            component: Valuation,
            roles: [PageRole.All],
        },
    ]
};

export default Route;
