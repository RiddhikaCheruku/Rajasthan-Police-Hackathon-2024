// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <Outlet />
        </div>
    )
}
