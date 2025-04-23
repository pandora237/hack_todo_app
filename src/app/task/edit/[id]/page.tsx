

import AddTaskForm from "@/components/AddTaskForm";
import { userCookies } from "@/utils/cookies";
import { singleTaskServices } from "@/utils/request/services";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {


  const id = parseInt((await params).id)
  if (!id || !(id > 0)) {
    return notFound()
  }

  const rest = await singleTaskServices(id, (await userCookies()).token ?? '')
  if (!rest?.success) {
    return notFound()
  }


  return (
    <div>
      <AddTaskForm task={rest?.data} />
    </div>
  )
}
