
import { notFound, redirect, useRouter } from "next/navigation";
import { allTaskServices } from "@/utils/request/services";
import ContentHomePage from "@/components/ContentHomePage";
import { groupTask } from "@/utils/helpers";
import { userCookies } from "@/utils/cookies";

export default async function Linsting() {
  const token = (await userCookies()).token
  if (!token) {
    return redirect('/login')
  }

  const resp = await allTaskServices(token)
  // if (!resp?.success) {
  //   return notFound()
  // }
  let taskGroup = groupTask(resp?.success ? resp?.data ?? [] : [])

  return (
    < main className=" flex flex-col items-start justify-center w-[100vw] h-full">
      <ContentHomePage taskGroup={taskGroup} />
    </main>
  )
}
