import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Users from './Users'

const Layout = () => {
    return (
        <main className='App'>
            <Header />
            <Outlet />
        </main>
    )
}

export default Layout
