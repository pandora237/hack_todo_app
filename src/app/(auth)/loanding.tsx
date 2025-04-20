import LoadingUi from '@/components/ui/LoadingUi'
import React from 'react'

interface Props { }

function Loading(props: Props) {
    const { } = props

    return (
        <div className=' w-full h-[calc(100vh_-_90px)]'>
            <LoadingUi />
        </div>
    )
}

export default Loading
