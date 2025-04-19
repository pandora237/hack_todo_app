
import AddTaskForm from "@/components/AddTaskForm";
import CategoriesTasks from "@/components/CategoriesTasks";
import ItemsTask from "@/components/ItemsTask";
import { Input } from "@/components/ui/override/InputCustom";
import Image from "next/image";

export default function Register() {
  return (
    <div className=" w-[98vw]  overflow-x-auto p-2 flex flex-col items-center justify-center ">
      <section>
        <div className=" w-full flex items-center justify-center">
          <h1 className=" font-extrabold underline">TODO APP</h1>
        </div>
        <div className=" my-4">
          <div>
            <Input placeholder="search" icon={<i className="fa-solid fa-key mr-1"></i>} className=" bg-white" />
          </div>
          <div className=" ">
            <h2 className=" underline">Filtres</h2>
          </div>

        </div>

      </section>
      <section className=" flex gap-2 w-full items-center min-h-[80vh] min-w-max">
        <CategoriesTasks />
        <CategoriesTasks />
        <CategoriesTasks />
        <CategoriesTasks />
        <CategoriesTasks />
        <CategoriesTasks />

      </section>

    </div>
  )
}
