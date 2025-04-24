'use client'

import { contextServices, logoutServices } from "@/utils/request/services";
import useStoreTodoApp from "@/utils/stores";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "./ui/separator";

interface Props {

}

export default function Header(props: Props) {

    const user = useStoreTodoApp(s => s.user)
    const setUser = useStoreTodoApp(s => s.setUser)
    const [isLoader, setIsLoader] = useState(false)
    const [showBlock, setShowBlock] = useState(true)
    const categories = useStoreTodoApp(s => s.categories)
    const setCategories = useStoreTodoApp(s => s.setCategories)
    const route = useRouter()
    const isLogged = user ? true : false
    // const isLogged = user?.isLogged
    let count
    count ? clearImmediate(count) : null

    const { setTheme } = useTheme()

    const processGetContext = (resp: any) => {
        if (resp.success) {
            setCategories(resp?.data?.categories ?? [])
        }
    }
    useEffect(() => {
        contextServices(processGetContext)
    }, [])

    // const handlechangeTheme = () => {
    //     const body = document.querySelector('body') as HTMLElement
    //     if (body.classList.contains('dark')) {
    //         body.classList.remove('dark')
    //     } else {
    //         body.classList.add('dark')
    //     }
    // }


    const processLogout = (resp: any) => {
        setIsLoader(prev => false)
        if (resp?.success) {
            toast.success('Deconnecter')
            setUser(null)
            route.replace(`/login`)
        } else {
            toast.error('Erreur de deconnexion')
        }
    }

    const logout = () => {
        setIsLoader(prev => true)
        logoutServices(user?.token ?? '', processLogout)
    }

    const toggleLink = () => {
        setShowBlock(false)
        count = setTimeout(() => {
            setShowBlock(true)
        }, 100)
    }

    return (
        <nav className=" w-full flex justify-between items-center py-2 px-4 shadow-md bg-accent">
            <Link href="/" className="cursor-pointer animate-bounce" title="TodoApp">
                <Image height={30} width={30} src={'/img/logo.svg'} alt="logo" />
            </Link>
            <div className=" w-full flex items-center justify-center">
                <h1 className=" font-extrabold  text-2xl py-2">TODO APP</h1>
            </div>
            <div className=" flex items-center gap-2 ">
                <div className={`h-full group relative `}>
                    <Button variant={'outline'} size="icon" type="button" className={` relative flex justify-between items-center peer `}>
                        <span className={`flex justify-between items-center gap-1 m-auto  cursor-pointer text-base p-1 ${user ? ' text-blue-500 border-b-2 border-blue-500 border-solid ' : ''}`} >
                            {isLoader ?
                                <svg className={`animate-spin h-[1.2rem] w-[1.2rem]  
                        ${''} 
                        `} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg> :
                                <div className=" font-sm hover:opacity-50 cursor-pointer flex justify-center items-center" >
                                    <span><i className="fa-solid fa-user"></i></span>
                                </div>
                            }
                        </span>
                    </Button>
                    <div className={` shadow-md absolute z-50 top-[calc(100%_+_7px)] -right-4 bg-accent rounded p-3 min-w-full min-h-12 w-max opacity-0 invisible overflow-hidden  
                        group-hover:top-full  group-hover:opacity-100 group-hover:visible
                         peer-focus:top-full   peer-focus:opacity-100  peer-focus:visible 
                        transition-all duration-500 ${!showBlock ? '!hidden' : ''}`}>
                        <div className=' flex flex-col items-end gap-2 '>
                            {isLogged ?
                                <>
                                    <div className={`  transition duration-300  `}   >
                                        <span>{'Bonjour ' + user?.user.username}<span className=" ml-2"><i className="fa-solid fa-face-smile"></i></span></span>
                                    </div >
                                    <Separator />
                                    <Link href={`/admin/dashboard`} onClick={() => { toggleLink() }} title={'dashboard'} className={` transition duration-300  hover:text-blue-500 hover:underline`} >
                                        <span className=' mr-1'><i className="fa-solid fa-gear"></i> {'dashboard'}</span>
                                    </Link >
                                    <div title={'logout'} className={` text-destructive transition duration-300 cursor-pointer hover:opacity-50 hover:underline`} onClick={() => { logout() }} >
                                        <span className=' mr-2'><i className="fa-solid fa-right-from-bracket"></i></span> {'logout'}
                                    </div >
                                </>
                                : <>
                                    <Link href={`/login`} onClick={() => { toggleLink() }} title={'login'} className={` transition duration-300  hover:text-blue-500 hover:underline`} >
                                        login
                                    </Link >

                                    <Link href={`/register`} onClick={() => { toggleLink() }} title={'register'} className={` transition duration-300 hover:text-blue-500 hover:underline`} >
                                        register
                                    </Link >
                                </>}
                        </div>
                    </div>
                </div >


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* <div className=" font-sm hover:opacity-50 cursor-pointer h-7 w-7 p-2 hover:bg-gray-100 dark:hover:text-accent rounded-full flex justify-center items-center" onClick={handlechangeTheme}>
                    <span><i className="fa-solid fa-moon"></i></span>
                </div> */}
            </div>
        </nav >
    )
}