import z from "zod"


export const registerFormType = z.object({
    firstName: z.string().min(2, {
        message: "firstName is required .",
    }),
    lastName: z.string().min(2, {
        message: "lastName is required .",
    }),
    userName: z.string().min(2, {
        message: "userName is required .",
    }),
    email: z.string().email().min(2, {
        message: "firstName is required .",
    }),
    password: z.string().min(4, {
        message: "password is required .",
    }),
})

export const loginFormType = z.object({
    email: z.string().email().min(2, {
        message: "firstName is required .",
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
    start_date: z.string().date().min(4, {
        message: "start date is required .",
    }),
    end_date: z.string().date().min(4, {
        message: "end date is required .",
    }),
    time_reminder: z.string().time().min(4, {
        message: "time reminder is required .",
    }),
    priority: z.string().min(4, {
        message: "priority is required .",
    }),
})
