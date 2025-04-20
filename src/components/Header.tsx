'use client'

import useStoreTodoApp from "@/utils/stores";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {

}

export default function Header(props: Props) {

    const user = useStoreTodoApp(s => s.user)
    const setUser = useStoreTodoApp(s => s.setUser)
    const [isLoader, setIsLoader] = useState(false)
    const [showBlock, setShowBlock] = useState(true)
    const isLogged = user?.isLogged
    // const isLogged = user?.isLogged
    let count
    count ? clearImmediate(count) : null

    const handlechangeTheme = () => {
        const body = document.querySelector('body') as HTMLElement
        if (body.classList.contains('dark')) {
            body.classList.remove('dark')
        } else {
            body.classList.add('dark')
        }
    }

    const logout = () => {
        setIsLoader(prev => true)
    }

    const toggleLink = () => {
        setShowBlock(false)
        count = setTimeout(() => {
            setShowBlock(true)
        }, 100)
    }

    return (
        <nav className=" w-full flex justify-between items-center py-2 px-4 shadow-md bg-accent">
            <Link href="/" className="cursor-pointer " title="TodoApp">
                <Image height={30} width={30} src={'/img/logo.svg'} alt="logo" />
            </Link>
            <div className=" w-full flex items-center justify-center">
                <h1 className=" font-extrabold  text-2xl py-2">TODO APP</h1>
            </div>
            <div className=" flex items-center gap-2 ">
                <div className={`h-full group relative `}>
                    <div className={`h-full group relative flex justify-between items-center `}>
                        <span className={`flex justify-between items-center gap-2    cursor-pointer text-base p-1 ${user ? ' text-blue-500 border-b-2 border-blue-500 border-solid ' : ''}`} >
                            {isLoader ?
                                <svg className={`animate-spin w-[1.3em] h-[1.3em] mx-auto 
                        ${''} 
                        `} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg> :
                                <div className=" font-sm hover:opacity-50 cursor-pointer h-7 w-7 hover:bg-gray-100 dark:hover:text-accent rounded-full flex justify-center items-center" >
                                    <span><i className="fa-solid fa-user"></i></span>
                                </div>
                            }
                        </span>
                    </div>
                    <div className={` shadow-md absolute z-50 top-[calc(100%_+_7px)] -right-4 bg-accent rounded p-3 min-w-full min-h-12 w-max opacity-0 invisible overflow-hidden  group-hover:top-full  group-hover:opacity-100 group-hover:visible transition-all duration-500 ${!showBlock ? '!hidden' : ''}`}>
                        <div className=' flex flex-col items-end gap-2 '>
                            {isLogged ?
                                <>
                                    <Link href={`/admin`} onClick={() => { toggleLink() }} title={'dashboard'} className={` transition duration-300  hover:text-blue-500 hover:underline`} >

                                        <span className=' mr-1'><i className="fa-solid fa-gear"></i> {'dashboard'}</span>

                                    </Link >
                                    <div title={'logout'} className={` text-red-600 transition duration-300 cursor-pointer hover:opacity-50 hover:underline`} onClick={() => { logout() }} >
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

                <div className=" font-sm hover:opacity-50 cursor-pointer h-7 w-7 p-2 hover:bg-gray-100 dark:hover:text-accent rounded-full flex justify-center items-center" onClick={handlechangeTheme}>
                    <span><i className="fa-solid fa-moon"></i></span>
                </div>
            </div>
        </nav>
    )
}