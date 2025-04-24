
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
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/override/ButtonCustom'
import { Dispatch, SetStateAction, useRef, useState } from "react"
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
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { ActionFormTask, formatErros } from "@/utils/helpers"
import { addTaskServices, editTaskServices } from "@/utils/request/services"
import useStoreTodoApp from "@/utils/stores"
import { Checkbox } from "./ui/checkbox"


interface Props {
    closeForm?: Dispatch<SetStateAction<ActionFormTask | false>>
    task?: Task
}

type TypeAddTask = z.infer<typeof addTaskType>

export default function AddTaskForm(props: Props) {
    const { closeForm, task } = props
    const user = useStoreTodoApp(s => s.user)

    const categories = useStoreTodoApp(s => s.categories)


    const form = useForm<TypeAddTask>({
        resolver: zodResolver(addTaskType),
        defaultValues: {
            title: task?.title,
            description: task?.description,
            // start_date: task?.end_date,
            // end_date: task?.start_date,
            time_reminder: task?.time_reminder.toString(),
            priority: task?.priority ?? 1,
            status: task?.status ? 1 : 0,
            category: task?.category_details?.id ?? 1
        },
    })

    const [isLoader, setIsLoader] = useState(false)
    const [statDate, setStatDate] = useState<any>(task?.start_date)
    const [endDate, setEndDate] = useState<any>(task?.end_date)
    const refStatus = useRef(null)
    const route = useRouter()


    const processAddEdit = (resp: any) => {
        setIsLoader(false)
        if (resp.success) {
            toast.success(task ? 'add ' : 'edit' + " task successful.")
            route.push('/')
        } else {
            resp?.errors ? formatErros(resp?.errors).forEach(err => toast.error(`${err}`)) : null
            // toast.error("Registration failed.");
        }
    }

    const onSubmit: SubmitHandler<TypeAddTask> = (data) => {
        if (!statDate) {
            return form.setError('start_date', {
                type: 'manual',
                message: 'start date requise',
            }, { shouldFocus: true });
        }
        data.start_date = statDate;

        if (!endDate) {
            return form.setError('end_date', {
                type: 'manual',
                message: 'end date requise',
            }, { shouldFocus: true });
        }
        data.end_date = endDate;
        console.log(data)
        setIsLoader(true);
        if (task) {
            user?.token ? editTaskServices(user?.token, data, task.id, processAddEdit) : setIsLoader(true);
        } else {
            addTaskServices(user?.token ?? '', data, processAddEdit);
        }
    }

    return (
        <div className=" max-w-96 min-w-72 sm:min-w-96 md:min-w-[450px] bg-background p-3 rounded-2xl  border-border border-2  ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className=" w-full flex items-center justify-between text-center " onClick={
                        () => {
                            if (closeForm) {
                                closeForm(false)
                            }
                        }}>
                        <h1 className=" font-extrabold text-2xl text-center m">{task ? 'Edit' : 'Add'} Task</h1>
                        {/* <span className=" w-6 h-6 bg-red-500 font-bold text-white  cursor-pointer"> X</span> */}
                    </div>
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
                                            {/* <Input type="hidden" {...field} value={statDate} /> */}
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar disabled={isLoader}
                                                mode="single"
                                                selected={statDate}
                                                onSelect={setStatDate}
                                                initialFocus
                                                {...field}
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
                                            {/* <input type="hidden" value={endDate} /> */}
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar disabled={isLoader}
                                                mode="single"
                                                selected={endDate}
                                                onSelect={setEndDate}
                                                initialFocus
                                                {...field}
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
                                    <Input placeholder="time reminder" {...field} type="number" disabled={isLoader} className=" block w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>category</FormLabel>
                                <FormControl>
                                    <Select {...field} value={field.value?.toString()} disabled={isLoader} onValueChange={(val) => field.onChange(parseInt(val))}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    categories?.map((cat, index) =>
                                                        <SelectItem key={'cate_' + index} className="" value={cat.id.toString()}>{cat.name}</SelectItem>
                                                    )
                                                }
                                                <SelectItem value="3">low</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>


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
                                    <Select {...field} value={field.value?.toString()} disabled={isLoader} onValueChange={(val) => field.onChange(parseInt(val))}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="1">high</SelectItem>
                                                <SelectItem value="2">medium</SelectItem>
                                                <SelectItem value="3">low</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" {...field} value={'status'}
                                            checked={!!field.value}
                                            defaultChecked={task?.status}
                                            onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                                            disabled={isLoader} />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            status ?
                                        </label>
                                        <p className="text-sm text-muted-foreground">

                                        </p>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className=" w-full " disabled={isLoader} isLoader={isLoader}  >{task ? 'Edit' : 'add'}</Button>
                </form>
            </Form>
        </div>
    )
}