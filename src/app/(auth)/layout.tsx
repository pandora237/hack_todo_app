import { userCookies } from "@/utils/cookies";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await userCookies()).token
  if (!token) {
    return redirect('/login')
  }
  return (
    < main className=" flex flex-col items-center justify-center w-full h-full py-5">
      {children}
    </main>
  );
}