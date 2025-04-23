
'use client'

import CategoriesTasks from "@/components/CategoriesTasks";
import { Input } from "@/components/ui/override/InputCustom";
import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ChangeEventHandler, KeyboardEventHandler, use, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/override/ButtonCustom";
import Overlay from "@/components/Overlay";
import AddTaskForm from "@/components/AddTaskForm";
import useStoreTodoApp from "@/utils/stores";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { allTaskServices, singleTaskServices } from "@/utils/request/services";
import { ActionTypeUpdate } from "@/utils/helpers";

interface Props {
    taskGroup: Record<number, Task[]>
}

export default function ContentHomePage(props: Props) {
    const { taskGroup } = props

    const [currentT, setCurrentT] = useState<Record<number, Task[]>>(taskGroup)
    const [showAddForm, setShowAddForm] = useState(false)
    const route = useRouter()

    const user = useStoreTodoApp(s => s.user)
    const categories = useStoreTodoApp(s => s.categories)

    useEffect(() => {
        setCurrentT(taskGroup)
        allTaskServices(user?.token ?? '',)
    }, [])
    const datas = currentT ? Object.values(currentT) : []
    const handlChange = (e: any) => {
        const val = e.target.value.trim().toLocaleLowerCase()

        let newtaskGroup: Record<number, Task[]> = {}
        if (val) {
            Object.entries(taskGroup).forEach(item => {
                let key = parseInt(item[0])
                const newTask = item[1].filter(t => {
                    if (t.title.toLowerCase().includes(val)) {
                        return true;
                    }
                })
                newtaskGroup[key] = newTask
            })
            return setCurrentT(newtaskGroup)
        }
        setCurrentT(taskGroup)
    }
    const handlFilterCat = (id: string) => {
        const id_cat = parseInt(id)
        let newTasks = {}
        if (id_cat == 0) {
            newTasks = taskGroup
        } else {
            if (currentT[id_cat]) {
                newTasks = currentT[id_cat]
            }
        }
        setCurrentT(prev => newTasks)
    }

    const endUpdate = (actionType: ActionTypeUpdate) => {

        switch (actionType) {
            case ActionTypeUpdate.delete:

                break;
            case ActionTypeUpdate.share:

                break;
        }

    }

    return (
        <div className=" w-[98vw] overflow-x-hidden   px-2 flex flex-col items-center justify-center ">
            <section>
                <div className="  py-3">
                    <div className="flex max-sm:flex-col sm:gap-4 gap-1 items-center ">
                        <Input placeholder="search" onKeyUp={handlChange} icon={<i className="fa-solid fa-search fa-2x mr-1"></i>} className=" bg-blue-100 w-80 h-14  border-2 border-accent-foreground !text-xl" />
                        <div className=" flex items-center gap-1">
                            <div className=" md:flex gap-1 items-center">
                                <Select onValueChange={handlFilterCat} >
                                    <SelectTrigger className="w-44 sm:!h-14 bg-white !text-xl">
                                        <SelectValue placeholder="select Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {/* <SelectLabel>All Categories</SelectLabel> */}
                                            <SelectItem value="0"  >All ... </SelectItem>
                                            {
                                                categories.map(cat =>
                                                    <SelectItem key={'filter_cat_' + cat.id} value={cat.id.toString()} ><span><i className={`fa-solid ${cat?.icon}`}></i></span>{cat.name}</SelectItem>
                                                )
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Link href={'/task/add'}>
                                <Button className=" sm:h-14 " onClick={() => { setShowAddForm(true) }} >
                                    add task
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </section >
            <section className=" flex gap-0  items-center justify-center  w-full overflow-x-auto overflow-y-hidden h-[calc(100vh_-_210px)]">
                {datas.length > 0 ?
                    datas.map((tasks, index) => <CategoriesTasks key={"cat_" + index} tasks={tasks} endUpdate={endUpdate} />) :
                    <div className=" w-full h-full flex items-center justify-center">
                        <span className=" text-2xl font-bold">No Taks</span>
                    </div>
                }
            </section>
            {/* <Overlay close={showAddForm} >
          <AddTaskForm closeForm={setShowAddForm} />
        </Overlay> */}

        </div >
    )
}
