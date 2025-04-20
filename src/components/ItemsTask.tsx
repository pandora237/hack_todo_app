
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
    const [showAddForm, setShowAddForm] = useState(false)

    const colorBg = task.priority == 1 ? 'bg-red-300' : task.priority == 2 ? 'bg-yellow-300' : 'bg-green-300'

    return (
        <div className={` max-w-80 min-w-72  rounded-2xl `}>
            <Card className={`w-full ${colorBg}`}>
                <CardHeader>
                    <CardTitle className=" flex w-full items-center justify-between">
                        <span>{task.title}</span>
                        <span className={` block w-3 h-3 rounded-full ${task.status ? 'bg-green-700' : 'bg-red-700'}`}></span>
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
                                task.status ?
                                    <>
                                        <Button disabled={loade} isLoader={loade} > {'set end'}</Button>
                                    </> :
                                    <>
                                        <Button disabled={loade} isLoader={loade} onClick={() => { setShowAddForm(true) }}> {'edit'}</Button>
                                    </>
                            }

                        </div>
                    </div>
                </CardFooter>
            </Card>
            <Overlay close={showAddForm} >
                <AddTaskForm closeForm={setShowAddForm} task={task} />
            </Overlay>
        </div>
    )
}