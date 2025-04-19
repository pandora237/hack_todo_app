import type { Metadata } from "next";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    < main className=" flex flex-col items-center justify-center w-full h-full">
      {children}
    </main>
  );
}
