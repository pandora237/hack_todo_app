import { Helps } from "../helpers";
import { api_routes } from "./api_route";
import clientFetch from "./fetcher";


export async function loginServices(datas: any, callback?: any) {
    const resp = await clientFetch({ url: `${Helps.local_url}/api/auth/login`, method: 'POST', body: datas, callback: callback })
    if (!callback) {
        return resp
    }
}
export async function logoutServices(token: string, callback?: any) {
    const resp = await clientFetch({ url: `${Helps.local_url}/api/auth/logout?no_fetch=0`, method: 'POST', callback: callback })
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
    const resp = await clientFetch({ url: api_routes().context.get, method: 'GET', callback: callback, show_toast: false })
    if (!callback) {
        return resp
    }
}
export async function singleTaskServices(id: number, token: string, callback?: any) {
    const resp = await clientFetch({ url: api_routes().task.getSingle.replace('{id}', id.toString()), method: 'GET', callback: callback, token: token })
    if (!callback) {
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
export async function editTaskServices(token: string, datas: any, callback?: any) {
    const resp = await clientFetch({ url: api_routes().task.edit, method: 'PUT', body: datas, callback: callback, token: token })
    if (!callback) {
        return resp
    }
}
export async function shareTaskServices(token: string, datas: any, callback?: any) {
    const resp = await clientFetch({ url: api_routes().invitations.add, method: 'POST', body: datas, callback: callback, token: token })
    if (!callback) {
        return resp
    }
}
export async function deleteTaskServices(token: string, id: any, callback?: any) {
    const resp = await clientFetch({ url: api_routes().task.delete.replace('{id}', id.toString()), method: 'DELETE', callback: callback, token: token })
    if (!callback) {
        return resp
    }
}
export async function patchTaskServices(token: string, id: any, datas: any, callback?: any) {
    const resp = await clientFetch({ url: api_routes().task.patch.replace('{id}', id), method: 'PATCH', body: datas, callback: callback, token: token })
    if (!callback) {
        return resp
    }
} 
