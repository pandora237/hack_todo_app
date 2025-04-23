import z from "zod"


export const registerFormType = z.object({
    username: z.string().min(2, {
        message: "username is required .",
    }),
    first_name: z.string().min(2, {
        message: "first_name is required .",
    }),
    last_name: z.string().min(2, {
        message: "last_name is required .",
    }),
    email: z.string().email().min(2, {
        message: "email is required .",
    }),
    password: z.string().min(4, {
        message: "password is required .",
    }),
})

export const loginFormType = z.object({
    email: z.string().email().min(2, {
        message: "username is required .",
    }),
    password: z.string().min(4, {
        message: "password is required .",
    }),
})

export const addTaskType = z.object({
    title: z.string().min(2, {
        message: "title is required .",
    }),
    description: z.string().min(4, {
        message: "description is required .",
    }),
    status: z.number().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    time_reminder: z.string().min(1, {
        message: "time reminder is required .",
    }),
    category: z.number().min(1, {
        message: "category is required .",
    }),
    priority: z.number().min(1, {
        message: "priority is required .",
    }),
})

export const shareTaskType = z.object({
    id_task: z.number().min(1, {
        message: "id_task is required .",
    }),
    email_invited_user: z.string().email().min(4, {
        message: "Email is required .",
    })
})
