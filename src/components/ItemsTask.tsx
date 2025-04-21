
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
import { ActionFormTask } from "@/utils/helpers"

enum status {
    progress = 'progress',
    end = 'end'
}



interface Props {
    task: Task
}

export default function ItemsTask(props: Props) {
    const { task } = props
    const [loade, setLoad] = useState(false)
    const [showAddForm, setShowAddForm] = useState<ActionFormTask | false>(false)

    const colorBg = task.priority == 1 ? 'bg-red-200' : task.priority == 2 ? 'bg-yellow-200' : 'bg-green-200'

    const handlerEndTask = () => {

    }

    const handlerDeleteTask = () => {

    }

    return (
        <div className={` max-w-80 min-w-72  rounded-2xl `}>
            <Card className={`w-full ${colorBg}`}>
                <CardHeader>
                    <CardTitle className=" flex w-full items-center justify-between ">
                        <span className=" flex flex-wrap items-center gap-1">
                            <span>{task.title}</span>
                            <span className={` block w-3 h-3 rounded-full ${task.status ? 'bg-green-700' : 'bg-destructive'}`} />
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" isLoader={loade} hiddenChild={true} disabled={loade} className=" w-8 h-8 text-center font-extrabold">
                                    ...
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => { setShowAddForm(ActionFormTask.addEdit) }}>
                                    edit
                                </DropdownMenuItem>
                                {
                                    task.status ?
                                        <DropdownMenuItem onClick={() => { handlerEndTask }}>
                                            Terminer
                                        </DropdownMenuItem> : null
                                }
                                <DropdownMenuItem onClick={() => { setShowAddForm(ActionFormTask.share) }}>
                                    partager
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { handlerDeleteTask }}>
                                    delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardTitle>
                    <CardDescription>{task.status ? 'task is end' : 'task in progress'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{task.description}</p>
                </CardContent>
                <CardFooter className=" w-full">
                    <div className=" flex items-center justify-between w-full">
                        <Badge>{task.priority == 1 ? 'higt' : task.priority == 2 ? 'medium' : 'low'}</Badge>
                        <div >
                            {
                                !task.status ?
                                    <Button disabled={loade} > <Link href={'/task/edit/' + task.id}> edit</Link></Button>
                                    : null
                            }

                        </div>
                    </div>
                </CardFooter>
            </Card>
            <Overlay close={showAddForm ? true : false} >
                {
                    showAddForm == ActionFormTask.addEdit ?
                        <AddTaskForm closeForm={setShowAddForm} task={task} /> :
                        <ShareForm closeForm={setShowAddForm} task={task} />

                }
            </Overlay>
        </div >
    )
}