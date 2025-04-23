
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
import { loginFormType } from '@/utils/schema'
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/override/ButtonCustom'
import { useState } from "react"
import { loginServices } from "@/utils/request/services"
import { toast } from "react-toastify"
import useStoreTodoApp from "@/utils/stores"
import { useRouter } from "next/navigation"


interface Props {
}

type LoginTypeDatas = z.infer<typeof loginFormType>

export default function LoginForm(props: Props) {
    const [loader, setLoader] = useState(false)
    const route = useRouter()
    const user = useStoreTodoApp(s => s.user)
    const setUser = useStoreTodoApp(s => s.setUser)

    const form = useForm<LoginTypeDatas>({
        resolver: zodResolver(loginFormType),
        defaultValues: {
            email: "",
        },
    })
    const processLogin = (resp: any) => {
        if (resp.success) {
            toast.success("Authentification réussi.")
            setUser(resp.data);
            route.push(`/`)
        } else {
            setLoader(false)
            toast.error("echec de l'authentification.")
        }
    }

    const onSubmit: SubmitHandler<LoginTypeDatas> = (datas) => {
        setLoader(true)
        loginServices(datas, processLogin)
    }


    return (
        <div className=" max-w-96 min-w-80 border-border border-2 p-3 bg-background  rounded-2xl sm:min-w-96 md:min-w-[450px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <h1 className=" font-extrabold text-2xl text-center m">Login</h1>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email"  {...field} icon={<i className="fa-solid fa-envelope"></i>} disabled={loader} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>password</FormLabel>
                                <FormControl>
                                    <Input placeholder="password" type="password" {...field} icon={<i className="fa-solid fa-key"></i>} disabled={loader} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={loader} isLoader={loader} className=" w-full" >Submit</Button>
                </form>
            </Form>
        </div>
    )
}