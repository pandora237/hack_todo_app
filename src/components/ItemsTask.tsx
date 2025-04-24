
'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "./ui/badge"
import { Button } from '@/components/ui/override/ButtonCustom'
import { useState } from "react"
import Overlay from "./Overlay"
import AddTaskForm from "./AddTaskForm"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun } from "lucide-react"
import ShareForm from "./ShareForm"
import Link from "next/link"
import { ActionFormTask, ActionTypeUpdate } from "@/utils/helpers"
import { deleteTaskServices, patchTaskServices } from "@/utils/request/services"
import useStoreTodoApp from "@/utils/stores"
import { toast } from "react-toastify"

enum status {
    progress = 'progress',
    end = 'end'
}



interface Props {
    task: Task,
    endUpdate?: (actionType: ActionTypeUpdate, data: Task[]) => void
}

export default function ItemsTask(props: Props) {
    const { task, endUpdate } = props
    const [loade, setLoad] = useState(false)
    const [showAddForm, setShowAddForm] = useState<ActionFormTask | false>(false)
    const user = useStoreTodoApp(s => s.user) as User

    const colorBg = task.priority == 1 ? 'border-red-500' : task.priority == 2 ? 'border-yellow-500' : 'border-green-500'
    // const colorBg = task.priority == 1 ? 'border-[#0B60B0]' : task.priority == 2 ? 'border-[#2D9CDB]' : 'border-[#AEDCF3]'



    const processDel = (resp: any) => {
        if (resp?.success) {
            toast.success('success to delete task.')
            endUpdate ? endUpdate(ActionTypeUpdate.delete, resp?.data) : null
        } else {
            toast.error('faild to delete task.')
        }
        setLoad(false)
    }
    const handlerDeleteTask = () => {
        setLoad(true)
        deleteTaskServices(user.token, task.id, processDel)
    }

    const processSetEnd = (resp: any) => {
        if (resp?.success) {
            toast.success('success to set end task.')
            endUpdate ? endUpdate(ActionTypeUpdate.delete, resp?.data) : null
        } else {
            toast.error('faild to set end task.')
        }
        setLoad(false)
    }
    const handlerEndTask = () => {
        setLoad(true)
        patchTaskServices(user.token, task.id, { status: false }, processSetEnd)
    }

    const userF = [
        {
            id: 2,
            username: 'Fr_al',
            email: 'jhon@hotmail.com',
            first_name: 'jhon',
            last_name: 'Atangana',
        },
        {
            id: 6,
            username: 'at_l',
            email: 'ibrahim@hotmail.com',
            first_name: 'toussa',
            last_name: 'Obrahim',
        },
        {
            id: 8,
            username: 'at_l',
            email: 'ibrahim@hotmail.com',
            first_name: 'roussa',
            last_name: 'ibrahim',
        } 
    ]


    return (
        <div className={` max-w-80 min-w-72  rounded-2xl `}>
            {/* <Card className={`w-full ${colorBg}`}> */}
            <Card className={`w-full border-2  ${colorBg} dark:bg-accent bg-secondary`}>
                <CardHeader>
                    <CardTitle className=" flex w-full items-center justify-between ">
                        <span className=" flex flex-wrap items-center gap-1">
                            <span>{task.title}</span>
                            <span title={task.status ? 'Task is runnig' : 'Task is end'} className={` block w-3 h-3 rounded-full ${task.status ? 'bg-green-700' : 'bg-destructive'}`} />
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="default" isLoader={loade} hiddenChild={true} disabled={loade} className=" w-8 h-8 text-center font-extrabold">
                                    ...
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {/* <DropdownMenuItem onClick={() => { setShowAddForm(ActionFormTask.addEdit) }}> */}
                                <DropdownMenuItem >
                                    <Link href={'/task/edit/' + task.id} className=" w-full"> <span><span className=" mr-2"><i className="fa-solid fa-pen-to-square"></i></span> edit</span> </Link>
                                </DropdownMenuItem>
                                {
                                    task.status ?
                                        <DropdownMenuItem >
                                            <div className=" w-full" onClick={handlerEndTask}><span className=" mr-2"><i className="fa-solid fa-hourglass-end"></i> </span> set End</div>
                                        </DropdownMenuItem> : null
                                }
                                <DropdownMenuItem >
                                    <div className=" w-full" onClick={() => { setShowAddForm(ActionFormTask.share) }}><span className=" mr-2"><i className="fa-solid fa-share-nodes"></i> </span> partager</div>
                                </DropdownMenuItem>
                                <DropdownMenuItem >
                                    <div onClick={handlerDeleteTask} className=" w-full"><span className=" mr-2"><i className="fa-solid fa-trash"></i> </span> delete</div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardTitle>
                    <CardDescription>{task.status ? 'task in progress' : ' task is end'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{task.description}</p>
                </CardContent>
                <CardFooter className=" w-full">
                    <div className=" flex items-center justify-between w-full">
                        <Badge>{task.priority == 1 ? 'higt' : task.priority == 2 ? 'medium' : 'low'}</Badge>
                        <div className=" flex text-accent relative h-8 w-1/2">
                            {
                                userF?.map((u, i) =>
                                    <div title={u.first_name + ' ' + u.last_name} key={'userSh_' + u.id + task.id} className={`absolute right-0 group cursor-default  `} style={{ translate: `-${i * 20}px` }}>
                                        < div 
                                            className=" w-8 h-8 bg-primary rounded-full shadow-xl 
                                            text-center border-2 border-accent flex items-center justify-center font-bold 
                                            hover:w-11 hover:h-11 group-hover:-translate-y-5 transition-all duration-200 ">
                                            <span className="">
                                                {
                                                    (u.first_name[0] + u.last_name[0]).toUpperCase()
                                                }
                                            </span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        {/* <div >
                            {
                                !task.status ?
                                    <Link href={'/task/edit/' + task.id}> <Button disabled={loade} > edit</Button></Link>
                                    : null
                            }

                        </div> */}
                    </div>
                </CardFooter>
            </Card>
            <Overlay close={showAddForm ? true : false} >
                {
                    showAddForm == ActionFormTask.addEdit ?
                        <AddTaskForm closeForm={setShowAddForm} task={task} /> :
                        <ShareForm closeForm={setShowAddForm} task={task} endUpdate={endUpdate} />
                }
            </Overlay>
        </div >
    )
}