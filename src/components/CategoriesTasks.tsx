
'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import ItemsTask from "./ItemsTask"
import { useState } from "react"

interface Props {
    tasks: Task[]
}

enum Priority {
    Low = "low",
    Medium = "medium",
    High = "high"
}


export default function CategoriesTasks(props: Props) {
    const { tasks } = props
    if (tasks.length < 1) {
        return
    }
    let cat = tasks[0].category
    const [currentT, setCurrentT] = useState(tasks)

    const handlerChange = (val: string) => {
        const newTab = currentT.sort((a, b) => {
            if (val === "desc") {
                return a.priority - b.priority
            }
            return b.priority - a.priority;
        });
        setCurrentT([...newTab])
    }

    return (
        <div className=" p-2 rounded-2xl h-full">
            <Card className=" !w-80 h-full gap-1 grid grid-rows-[50px_auto_50px]">
                <div className="bg-blue-500 dark:bg-accent py-2 flex items-center justify-between w-full px-2">
                    <CardHeader className="  ">
                        <CardTitle className=" font-extrabold uppercase text-white "><h2 className="text-sm">{cat?.title}</h2></CardTitle>
                    </CardHeader>
                    <Select onValueChange={handlerChange} >
                        <SelectTrigger className="w-[90px] bg-white h-11">
                            <SelectValue placeholder="priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={'desc'} defaultChecked>desc</SelectItem>
                                <SelectItem value={"asc"}>asc</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <CardContent className=" flex flex-col gap-3 overflow-y-auto overflow-x-hidden p-2">
                    {currentT.map(t => <ItemsTask key={'task_' + t.id} task={t} />)}
                </CardContent>
                <CardFooter className="bg-blue-500 dark:bg-accent py-2 dark:text-accent-foreground">
                    <p>  Footer</p>
                </CardFooter>
            </Card>
        </div>
    )
}