import Image from "next/image";
import Link from "next/link";

interface Props {

}

export default function Header(props: Props) {


    return (
        <nav className=" w-full flex justify-between items-center py-2 px-4 shadow-md bg-accent">
            <Link href="/" className="cursor-pointer " title="TodoApp">
                <Image height={30} width={30} src={'/img/logo.svg'} alt="logo" />
            </Link>
            <div className=" flex items-center gap-2">
                <div className=" font-sm hover:opacity-50 cursor-pointer max-h-8 p-2 hover:bg-gray-100 rounded-full flex justify-center items-center" >
                    <span><i className="fa-solid fa-user"></i></span>
                </div>
                <div className=" font-sm hover:opacity-50 cursor-pointer max-h-8 p-2 hover:bg-gray-100 rounded-full flex justify-center items-center" >
                    <span><i className="fa-solid fa-moon"></i></span>
                </div>
            </div>
        </nav>
    )
}