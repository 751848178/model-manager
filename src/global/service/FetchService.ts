import { Course, Subject, Grade, Type } from "@global/config/http.config";
import { post, get } from "@util/request";
import { ICourse, ISubject, IGrade, IType } from "../type/Modules";

export interface IResult<T> {
	data: T;
	msg: string;
	code: number;
}

export async function getCourses(): Promise<ICourse[]> {
    const res = await get<IResult<ICourse[]>>(Course.list);
    // console.error(res);
    if (res.code === 0) return res.data;
    alert(res.msg);
    return [];
}

export async function getGrades(): Promise<IGrade[]> {
    const res = await get<IResult<IGrade[]>>(Grade.list);
    // console.error(res);
    if (res.code === 0) return res.data;
    alert(res.msg);
    return [];
}

export async function getTypes(): Promise<IType[]> {
    const res = await get<IResult<IType[]>>(Type.list);
    // console.error(res);
    if (res.code === 0) return res.data;
    alert(res.msg);
    return [];
}

export async function getSubjects(): Promise<ISubject[]> {
    const res = await get<IResult<ISubject[]>>(Subject.list);
    // console.error(res);
    if (res.code === 0) return res.data;
    alert(res.msg);
    return [];
}
