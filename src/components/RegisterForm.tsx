
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
import { registerFormType } from '@/utils/schema'
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/override/ButtonCustom'
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { registerServices } from "@/utils/request/services"
import { formatErros } from "@/utils/helpers"
import Link from "next/link"


interface Props {

}
type RegisterTypeDatas = z.infer<typeof registerFormType>

export default function RegisterForm(props: Props) {
    const [loader, setLoader] = useState(false)
    const route = useRouter()

    const form = useForm<RegisterTypeDatas>({
        resolver: zodResolver(registerFormType),
        defaultValues: {
        },
    })

    const processRegister = (resp: any) => {
        if (resp.success) {
            toast.success("Registration successful.");
            route.push(`/login`)
        } else {
            setLoader(false);
            resp?.error ? formatErros(resp?.error).forEach(err => toast.error(`${err}`)) : null
            toast.error(resp.message);
        }
    }

    const onSubmit: SubmitHandler<RegisterTypeDatas> = (datas) => {
        setLoader(true)
        registerServices(datas, processRegister)
    }


    return (
        <div className=" max-w-96 min-w-80  border-2 border-border p-3  bg-background  rounded-md sm:min-w-96 md:min-w-[450px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <h1 className=" font-extrabold text-2xl text-center">Register</h1>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>first_name</FormLabel>
                                <FormControl>
                                    <Input placeholder="first_name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>last_name</FormLabel>
                                <FormControl>
                                    <Input placeholder="last_name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
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
                                    <Input placeholder="password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className=" w-full flex flex-col items-center">
                        <Button type="submit" disabled={loader} isLoader={loader} className=" w-full" >Register</Button>
                        <span>or</span>
                        <Link href={'/login'} className=" w-full" ><Button type="button" variant={'outline'} className=" w-full">login</Button></Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}