export function is_formdata(body: FormData | JSON): body is FormData {
    return body instanceof FormData;
}

export function formatErros(datas: { [key: string]: string[] }): string[] {
    let errors: string[] = []
    Object.values(datas).forEach((tab_err) => errors = [...errors, ...tab_err])
    return errors
}

export const Helps = {
    code_authentication: 402,
    local_url: process.env.NEXT_PUBLIC_LOCAL_API_URL,
};

export enum ActionFormTask {
    addEdit = 'add',
    share = 'share'
}