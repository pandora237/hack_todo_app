
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
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'


interface Props {
}

export default function LoginForm(props: Props) {

    const form = useForm<z.infer<typeof loginFormType>>({
        resolver: zodResolver(loginFormType),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = () => {

    }


    return (
        <div className=" max-w-96 min-w-80 bg-accent p-3 rounded-2xl sm:min-w-96 md:min-w-[450px]">
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
                                    <Input placeholder="email" {...field} icon={<i className="fa-solid fa-envelope"></i>} />
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
                                    <Input placeholder="password" {...field} icon={<i className="fa-solid fa-key"></i>} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}