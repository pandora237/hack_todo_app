
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { Helps, is_formdata } from "../helpers";

const clientFetch = async ({ url, method, body, cache, revalidate, tags, callback, priority, show_toast = true, page_fallback = "login", token }: { url: string, method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", body?: any, cache?: 'force-cache' | 'no-store' | 'default' | null, revalidate?: number | null, tags?: string[] | null, callback?: any, priority?: "auto" | "high" | "low", show_toast?: boolean, page_fallback?: string, token?: string }) => {

    const headers = new Headers()
    token ? headers.append("Authorization", `Token ${token}`) : null
    headers.append("Content-Type", "application/json")

    const requestOptions: RequestInit = {
        method,
        mode: "cors",
        cache: "no-store",
        headers: headers
    };

    if (body) {
        requestOptions.body = is_formdata(body) ? body : JSON.stringify(body);
    }

    if (cache) {
        requestOptions.cache = cache;
    }
    if (priority) {
        requestOptions.priority = priority;
    }

    let next: any = {}
    if (revalidate) {
        next.revalidate = revalidate;
    }
    if (tags) {
        next.tags = tags;
    }

    requestOptions.next = next;
    try {
        const res = await fetch(url, requestOptions)
        const data = await res.json()

        if (!data.success) {
            if (data?.status == Helps.code_authentication) {
                if (typeof window !== 'undefined') {
                    await fetch(`${Helps.local_url}/api/logout?no_fetch=1`, { method: "GET" })
                    const url_redirect = window.location.href
                    setTimeout(async () => {
                        window.location.assign(`${Helps.local_url}/${page_fallback}?redirect_url=${url_redirect}`)
                    }, 2000)
                    toast.error('Authentification requis. Vous Serez redirigé pour vous connecter')
                } else {
                    redirect(`${Helps.local_url}/${page_fallback}`)
                }
            }
            if (typeof window !== 'undefined' && show_toast) {
                toast.error(data.message)
            } else {
                console.log('error::', data.message)
            }
        }

        if (callback) {
            callback(data);
        } else {
            return data
        }

    } catch (error: any) {
        if (typeof window !== 'undefined' && show_toast) {
            toast.error(error.message, {
                autoClose: false
            })
        } else {
            console.log('error::', error.message)
        }

        const response = {
            success: false,
            status: 500,
            message: error.message,
            data: {}
        };

        if (callback) {
            callback(response);
        } else {
            return response;
        }
    }
}

export default clientFetch
