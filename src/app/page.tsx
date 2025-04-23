
import { redirect, useRouter } from "next/navigation";
import { allTaskServices } from "@/utils/request/services";
import userCookies from "@/utils/cookies";
import ContentHomePage from "@/components/ContentHomePage";
import { groupTask } from "@/utils/helpers";

export default async function Linsting() {
  const token = userCookies.token
  if (!token) {
    return redirect('/login')
  }

  const resp = await allTaskServices(userCookies.token)
  let taskGroup = groupTask(resp?.data)

  return (
    < main className=" flex flex-col items-start justify-center w-full h-full">
      <ContentHomePage taskGroup={taskGroup} />
    </main>
  )
}
