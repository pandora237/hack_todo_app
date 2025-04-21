
'use client'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/override/InputCustom"
import { loginFormType, shareTaskType } from '@/utils/schema'
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/override/ButtonCustom'
import { Dispatch, SetStateAction, useState } from "react"
import { loginServices } from "@/utils/request/services"
import { toast } from "react-toastify"
import useStoreTodoApp from "@/utils/stores"
import { useRouter } from "next/navigation"
import { ActionFormTask } from "@/utils/helpers"


interface Props {
    closeForm?: Dispatch<SetStateAction<ActionFormTask | false>>
    task?: Task
}

type ShareTaskTypeDatas = z.infer<typeof shareTaskType>

export default function ShareForm(props: Props) {
    const { closeForm, task } = props

    const [loader, setLoader] = useState(false)
    const route = useRouter()
    const user = useStoreTodoApp(s => s.user)
    const setUser = useStoreTodoApp(s => s.setUser)

    const form = useForm<ShareTaskTypeDatas>({
        resolver: zodResolver(shareTaskType),
        defaultValues: {
            email: "",
        },
    })
    const processLogin = (resp: any) => {
        console.log(resp)
        if (resp.success) {
            toast.success("partage réussi.")
            setUser(resp.data?.user)
        } else {
            setLoader(false)
        }
    }

    const onSubmit: SubmitHandler<ShareTaskTypeDatas> = (datas) => {
        setLoader(true)
        loginServices(datas, processLogin)
    }


    return (
        <div className=" max-w-96 min-w-80 bg-accent border-border border-2 p-3 rounded-2xl sm:min-w-96 md:min-w-[450px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className=" w-full flex items-center justify-between text-center " onClick={
                        () => {
                            if (closeForm) {
                                closeForm(false)
                            }
                        }}>
                        <h1 className=" font-extrabold text-2xl text-center m">Share task : {task?.title}</h1>
                        <span className=" w-6 h-6 bg-red-500 font-bold text-white  cursor-pointer"> X</span>
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} icon={<i className="fa-solid fa-envelope"></i>} disabled={loader} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type="hidden" {...field} disabled={loader} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={loader} isLoader={loader} >Submit</Button>
                </form>
            </Form>
        </div>
    )
}