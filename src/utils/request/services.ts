import { api_routes } from "./api_route";
import clientFetch from "./fetcher";


export async function loginServices(datas: any, callback?: any) {
    const resp = await clientFetch({ url: api_routes().auth.login, method: 'POST', body: datas, callback: callback })
    if (!callback) {
        return resp
    }
}
export async function logoutServices(callback?: any) {
    const resp = await clientFetch({ url: api_routes().auth.logout, method: 'POST', callback: callback })
    if (!callback) {
        return resp
    }
}
export async function registerServices(datas: any, callback?: any) {
    const resp = await clientFetch({ url: api_routes().auth.register, method: 'POST', body: datas, callback: callback, show_toast: false })
    if (!callback) {
        return resp
    }
}
export async function contextServices(callback?: any) {
    const resp = await clientFetch({ url: api_routes().categories.getAll, method: 'GET', callback: callback })
    if (!callback) {
        return resp
    }
}
export async function singleTaskServices(id: number, token: string, callback?: any) {
    const resp = await clientFetch({ url: api_routes().task.getSingle.replace('{id}', id.toString()), method: 'GET', callback: callback, token: token })
    if (!callback) {
        console.log('resp:', resp)
        return resp
    }
}
export async function allTaskServices(token: string, callback?: any) {
    const resp = await clientFetch({ url: api_routes().task.getAll, method: 'GET', callback: callback, token: token })
    if (!callback) {
        return resp
    }
}
export async function addTaskServices(token: string, datas: any, callback?: any) {
    const resp = await clientFetch({ url: api_routes().task.add, method: 'POST', body: datas, callback: callback, token: token })
    if (!callback) {
        return resp
    }
}
export async function deleteTaskServices(token: string, datas: any, callback?: any) {
    const resp = await clientFetch({ url: api_routes().task.delete, method: 'POST', body: datas, callback: callback, token: token })
    if (!callback) {
        return resp
    }
}
export async function changeStatusTaskServices(token: string, datas: any, callback?: any) {
    const resp = await clientFetch({ url: api_routes().task.setStatus, method: 'POST', body: datas, callback: callback, token: token })
    if (!callback) {
        return resp
    }
}
