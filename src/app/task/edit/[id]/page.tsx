

import AddTaskForm from "@/components/AddTaskForm";  
import userCookies from "@/utils/cookies";
import { singleTaskServices } from "@/utils/request/services";
import Image from "next/image";
import { notFound } from "next/navigation";

// export const dynamic = 'force-dynamic';

export default async function Task({ params }: { params: { id: string } }) {

  userCookies.token

  const id = parseInt(params.id);
  if (!id || !(id > 0)) {
    return notFound()
  }

  const rest = await singleTaskServices(id, userCookies.token)
  if (!rest?.success) {
    return notFound()
  }


  return (
    <div>
      <AddTaskForm task={rest?.data} />
    </div>
  )
}
