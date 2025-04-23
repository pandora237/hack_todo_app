export function is_formdata(body: FormData | JSON): body is FormData {
    return body instanceof FormData;
}

export function formatErros(datas: { [key: string]: string[] }): string[] {
    let errors: string[] = []
    Object.values(datas).forEach((tab_err) => errors = [...errors, ...tab_err])
    return errors
}

export function groupTask(task: Task[]) {
    let taskGroup: Record<number, Task[]> = {};
    task.forEach((task: Task) => {
        const categoryId = task?.category_details?.id ?? 0;
        if (!taskGroup[categoryId]) {
            taskGroup[categoryId] = [];
        }
        taskGroup[categoryId].push(task);
    });
    return taskGroup
}

export const Helps = {
    code_authentication: 402,
    local_url: process.env.NEXT_PUBLIC_LOCAL_API_URL,
};

export enum ActionFormTask {
    addEdit = 'add',
    share = 'share'
}

export enum ActionTypeUpdate {
    delete = 'delete',
    share = 'share'
}