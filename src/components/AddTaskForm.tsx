
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
import { addTaskType } from '@/utils/schema'
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/override/ButtonCustom'
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Textarea } from "./ui/textarea"


interface Props {
}

export default function AddTaskForm(props: Props) {

    const form = useForm<z.infer<typeof addTaskType>>({
        resolver: zodResolver(addTaskType),
        defaultValues: {
            title: "",
        },
    })

    const [isLoader, setIsLoader] = useState(false)
    const [statDate, setStatDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    const onSubmit = () => {

    }


    return (
        <div className=" max-w-96 sm:min-w-96 md:min-w-[450px] bg-white p-3 rounded-2xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <h1 className=" font-extrabold text-2xl text-center m">Add / Edit Task</h1>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>title</FormLabel>
                                <FormControl>
                                    <Input placeholder="title" {...field} disabled={isLoader} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="description" {...field} disabled={isLoader} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>start date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button disabled={isLoader}
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] justify-start text-left font-normal",
                                                    !statDate && "text-muted-foreground"
                                                ) + " w-full"}
                                            >
                                                <CalendarIcon />
                                                {statDate ? format(statDate, "PPP") : <span>start date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar disabled={isLoader}
                                                mode="single"
                                                selected={statDate}
                                                onSelect={setStatDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>


                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>end date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button disabled={isLoader}
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] justify-start text-left font-normal",
                                                    !endDate && "text-muted-foreground"
                                                ) + " w-full"}
                                            >
                                                <CalendarIcon />
                                                {endDate ? format(endDate, "PPP") : <span>end date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar disabled={isLoader}
                                                mode="single"
                                                selected={endDate}
                                                onSelect={setEndDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>


                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="time_reminder"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>time reminder</FormLabel>
                                <FormControl>
                                    <Input placeholder="time reminder" {...field} type="time" disabled={isLoader} className=" block w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>priority</FormLabel>
                                <FormControl>
                                    <Select {...field} disabled={isLoader}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a fruit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Fruits</SelectLabel>
                                                <SelectItem value="apple">Apple</SelectItem>
                                                <SelectItem value="banana">Banana</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className=" w-full" disabled={isLoader} isLoader={isLoader}  >Submit</Button>
                </form>
            </Form>
        </div>
    )
}