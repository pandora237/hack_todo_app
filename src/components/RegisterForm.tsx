
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
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'


interface Props {

}

export default function RegisterForm(props: Props) {

    const form = useForm<z.infer<typeof registerFormType>>({
        resolver: zodResolver(registerFormType),
        defaultValues: {
            userName: "",
        },
    })

    const onSubmit = () => {

    }


    return (
        <div className=" max-w-96 min-w-80 bg-accent p-3 rounded-md sm:min-w-96 md:min-w-[450px]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <h1 className=" font-extrabold text-2xl text-center">Register</h1>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>firstName</FormLabel>
                                <FormControl>
                                    <Input placeholder="firstName" {...field} />
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
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>lastName</FormLabel>
                                <FormControl>
                                    <Input placeholder="lastName" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>userName</FormLabel>
                                <FormControl>
                                    <Input placeholder="userName" {...field} />
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
                                    <Input placeholder="password" {...field} />
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