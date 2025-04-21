'use client'


import AddTaskForm from "@/components/AddTaskForm";
import RegisterForm from "@/components/RegisterForm";
import LoadingUi from "@/components/ui/LoadingUi";
import { singleTaskServices } from "@/utils/request/services";
import useStoreTodoApp from "@/utils/stores";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function Task({ params }: { params: { id: string } }) {
  const user = useStoreTodoApp(s => s.user)


  const id = parseInt(params.id);
  const data = await singleTaskServices(id, user?.token ?? '')
  if (!data.success) {
    console.log('datadatadatadata:', data)
    return notFound()
  }
  return (
    // <Suspense fallback={<LoadingUi />} >
    <Suspense fallback={'Loading ... '} >
      <div>
        <AddTaskForm task={data?.data} />
      </div>
    </Suspense>
  );
}
