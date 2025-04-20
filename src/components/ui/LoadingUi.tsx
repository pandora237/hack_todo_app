import Link from 'next/link'
import React from 'react'
import defaultImg from '@/assets/img/scolrar/scolrar_3.png'
import './style_spinner.css'

interface Props {
}

function LoadingUi(props: Props) {
    const { } = props

    return (
        <div className=' flex flex-col items-center justify-center gap-1 w-full h-[calc(100vh_-_90px)]'>
            <div>
                <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect className="spinner_LWk7" x="1.5" y="1.5" rx="1" width="9" height="9" /><rect className="spinner_yOMU" x="13.5" y="1.5" rx="1" width="9" height="9" /><rect className="spinner_KS4S" x="13.5" y="13.5" rx="1" width="9" height="9" /><rect className="spinner_zVee" x="1.5" y="13.5" rx="1" width="9" height="9" /></svg>

            </div>
        </ div>
    )
}

export default LoadingUi
