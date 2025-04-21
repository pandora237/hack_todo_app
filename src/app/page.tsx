
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
import { ChangeEventHandler, KeyboardEventHandler, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/override/ButtonCustom";
import Overlay from "@/components/Overlay";
import AddTaskForm from "@/components/AddTaskForm";
import useStoreTodoApp from "@/utils/stores";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Linsting() {
  const [currentT, setCurrentT] = useState<Record<number, Task[]>>([])
  const [showAddForm, setShowAddForm] = useState(false)

  const user = useStoreTodoApp(s => s.user)
  if (!user) {
    // return redirect('/login')
  }

  const fakeTasks: Task[] = [
    {
      id: 1,
      title: "Faire les courses",
      description: "Acheter du pain, des œufs, du lait et des fruits.",
      status: false,
      start_date: "2025-04-18T09:00:00",
      end_date: "2025-04-18T10:00:00",
      time_reminder: 15,
      priority: 2,
      category: {
        id: 1,
        name: "Vie quotidienne",
        description: "Tâches liées à la maison ou aux besoins personnels"
      }
    },
    {
      id: 2,
      title: "Réunion projet Hackathon",
      description: "Réunion de coordination avec l'équipe hackathon.",
      status: true,
      start_date: "2025-04-19T14:30:00",
      end_date: "2025-04-19T16:00:00",
      time_reminder: 30,
      priority: 3,
      category: {
        id: 2,
        name: "Travail",
        description: "Tâches liées au travail ou aux projets professionnels"
      }
    },
    {
      id: 3,
      title: "Session de sport",
      description: "30 minutes de cardio et 30 minutes de musculation.",
      status: false,
      start_date: "2025-04-20T07:00:00",
      end_date: "2025-04-20T08:00:00",
      time_reminder: 10,
      priority: 1,
      category: {
        id: 3,
        name: "Santé",
        description: "Tâches relatives au bien-être physique et mental"
      }
    },
    {
      id: 4,
      title: "Réviser Java JEE",
      description: "Approfondir les servlets, JSP et JPA pour l'examen.",
      status: false,
      start_date: "2025-04-20T20:00:00",
      end_date: "2025-04-20T22:00:00",
      time_reminder: 20,
      priority: 3,
      category: {
        id: 4,
        name: "Études",
        description: "Tâches liées aux études académiques"
      }
    },
    {
      id: 5,
      title: "Appeler maman",
      description: "Vérifier si tout va bien et prendre des nouvelles.",
      status: true,
      start_date: "2025-04-18T18:00:00",
      end_date: "2025-04-18T18:30:00",
      time_reminder: 5,
      priority: 2,
      category: {
        id: 1,
        name: "Vie quotidienne",
        description: "Tâches liées à la maison ou aux besoins personnels"
      }
    }, {
      id: 6,
      title: "Préparer la présentation du projet",
      description: "Créer les slides et revoir le plan de présentation.",
      status: false,
      start_date: "2025-04-21T15:00:00",
      end_date: "2025-04-21T17:00:00",
      time_reminder: 25,
      priority: 3,
      category: {
        id: 2,
        name: "Travail",
        description: "Tâches liées au travail ou aux projets professionnels"
      }
    },
    {
      id: 7,
      title: "Lecture détente",
      description: "Lire un chapitre du livre 'L'Alchimiste' de Paulo Coelho.",
      status: false,
      start_date: "2025-04-21T21:00:00",
      end_date: "2025-04-21T22:00:00",
      time_reminder: 10,
      priority: 1,
      category: {
        id: 5,
        name: "Loisirs",
        description: "Activités de détente ou de plaisir personnel"
      }
    },
    {
      id: 8,
      title: "Faire la lessive",
      description: "Lancer une machine pour les vêtements de couleur.",
      status: false,
      start_date: "2025-04-22T08:00:00",
      end_date: "2025-04-22T09:00:00",
      time_reminder: 15,
      priority: 2,
      category: {
        id: 1,
        name: "Vie quotidienne",
        description: "Tâches liées à la maison ou aux besoins personnels"
      }
    },
    {
      id: 9,
      title: "Rechercher un stage",
      description: "Envoyer 3 candidatures pour des stages en développement.",
      status: false,
      start_date: "2025-04-22T10:00:00",
      end_date: "2025-04-22T12:00:00",
      time_reminder: 30,
      priority: 3,
      category: {
        id: 2,
        name: "Travail",
        description: "Tâches liées au travail ou aux projets professionnels"
      }
    },
    {
      id: 10,
      title: "Méditation",
      description: "10 minutes de respiration et de pleine conscience.",
      status: false,
      start_date: "2025-04-22T06:30:00",
      end_date: "2025-04-22T06:45:00",
      time_reminder: 5,
      priority: 1,
      category: {
        id: 3,
        name: "Santé",
        description: "Tâches relatives au bien-être physique et mental"
      }
    }, {
      id: 11,
      title: "Planifier la semaine",
      description: "Organiser les tâches importantes de la semaine à venir.",
      status: false,
      start_date: "2025-04-22T19:00:00",
      end_date: "2025-04-22T19:30:00",
      time_reminder: 10,
      priority: 2,
      category: {
        id: 1,
        name: "Vie quotidienne",
        description: "Tâches liées à la maison ou aux besoins personnels"
      }
    },
    {
      id: 12,
      title: "Corriger le rapport de projet",
      description: "Relire et corriger les fautes dans le rapport.",
      status: false,
      start_date: "2025-04-23T10:00:00",
      end_date: "2025-04-23T11:30:00",
      time_reminder: 15,
      priority: 3,
      category: {
        id: 2,
        name: "Travail",
        description: "Tâches liées au travail ou aux projets professionnels"
      }
    },
    {
      id: 13,
      title: "Étude du cours d'algorithmique",
      description: "Réviser les arbres binaires et les algorithmes de tri.",
      status: false,
      start_date: "2025-04-23T14:00:00",
      end_date: "2025-04-23T16:00:00",
      time_reminder: 20,
      priority: 3,
      category: {
        id: 4,
        name: "Études",
        description: "Tâches liées aux études académiques"
      }
    },
    {
      id: 14,
      title: "Marcher 10 000 pas",
      description: "Petite promenade dans le quartier pour atteindre l'objectif santé.",
      status: true,
      start_date: "2025-04-23T17:00:00",
      end_date: "2025-04-23T18:00:00",
      time_reminder: 5,
      priority: 1,
      category: {
        id: 3,
        name: "Santé",
        description: "Tâches relatives au bien-être physique et mental"
      }
    },
    {
      id: 15,
      title: "Regarder un film",
      description: "Se détendre en regardant un film de science-fiction.",
      status: true,
      start_date: "2025-04-23T21:00:00",
      end_date: "2025-04-23T23:00:00",
      time_reminder: 0,
      priority: 1,
      category: {
        id: 5,
        name: "Loisirs",
        description: "Activités de détente ou de plaisir personnel"
      }
    }
  ];
  let taskGroup: Record<number, Task[]> = {};

  fakeTasks.forEach((task) => {
    const categoryId = task.category.id;
    if (!taskGroup[categoryId]) {
      taskGroup[categoryId] = [];
    }
    taskGroup[categoryId].push(task);
  });
  useEffect(() => {
    setCurrentT(taskGroup)
  }, [])

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
  const datas = Object.values(currentT)

  return (
    < main className=" flex flex-col items-start justify-center w-full h-full">
      <div className=" w-[98vw] overflow-x-hidden   px-2 flex flex-col items-center justify-center ">
        <section>
          <div className="  py-3">
            <div className="flex max-sm:flex-col sm:gap-4 gap-1 items-center ">
              <Input placeholder="search" onKeyUp={handlChange} icon={<i className="fa-solid fa-search fa-2x mr-1"></i>} className=" bg-blue-100 w-80 h-14  border-2 border-accent-foreground !text-xl" />
              <div className=" flex items-center gap-1">
                <div className=" md:flex gap-1 items-center">
                  <Select >
                    <SelectTrigger className="w-44 sm:!h-14 bg-white !text-xl">
                      <SelectValue placeholder="select Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {/* <SelectLabel>All Categories</SelectLabel> */}
                        <SelectItem value="All" >All ... </SelectItem>
                        <SelectItem value="apple" >Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button className=" sm:h-14 " onClick={() => { setShowAddForm(true) }} >
                  <Link href={'/task/add'}>add task</Link>
                </Button>
              </div>

            </div>
          </div>
        </section >
        <section className=" flex gap-0  items-center justify-center  w-full overflow-x-auto overflow-y-hidden h-[calc(100vh_-_210px)]">
          {datas.length > 0 ?
            datas.map((tasks, index) => <CategoriesTasks key={"cat_" + index} tasks={tasks} />) :
            <div className=" w-full h-full flex items-center justify-center">
              <span className=" text-2xl font-bold">No Taks</span>
            </div>
          }
        </section>
        {/* <Overlay close={showAddForm} >
          <AddTaskForm closeForm={setShowAddForm} />
        </Overlay> */}

      </div >
    </main>
  )
}
