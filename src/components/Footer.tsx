import Image from "next/image";

interface Props {

}

export default function Footer(props: Props) {


    return (
        <>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center border-t-2 border-accent py-1 text-xs">
                <p className="text-accent dark:text-accent-foreground">© 💻A³Code 2025 ENSPY-3GI</p>
            </footer>
        </>
    )
}