
'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ItemsTask from "./ItemsTask"

interface Props {
}

export default function CategoriesTasks(props: Props) {

    return (
        <div className=" p-2 rounded-2xl">
            <Card className=" w-full">
                <CardHeader>
                    <CardTitle className=" font-extrabold uppercase"><h2>Sport</h2></CardTitle>
                </CardHeader>
                <CardContent className=" flex flex-col gap-3">
                    <ItemsTask />
                    <ItemsTask />
                    <ItemsTask />
                    <ItemsTask />

                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    )
}