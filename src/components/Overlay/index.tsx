'use client'

import React, { useEffect, useState } from 'react'

interface Props {
    children: React.ReactNode,
    close?: boolean
}

function Overlay(props: Props) {
    const { children, close } = props
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        setIsOpen(close ?? false)
    }, [close, isOpen])
    if (!isOpen) {
        return
    }

    return (
        <div className={`${isOpen ? 'visible' : 'invisible'} fixed top-0 right-0 z-50 w-full h-full flex flex-col items-center justify-center bg-[rgba(0,0,0,0.9)]`} id='overlay__' onClick={(e: any) => {
            if (e.target.id === 'overlay__') {
                // setIsOpen(prev => false)
            }
        }}>
            {
                isOpen && <div>
                    {children}
                </div>
            }
        </div>
    )
}

export default Overlay
