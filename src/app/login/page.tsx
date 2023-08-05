'use client';
import Footer from '@/components/Layouts/Footer'
import Layouts from '@/components/Layouts/Layouts'
import Navbar from '@/components/Layouts/Navbar'
import Login from '@/components/Login/Login'
import React from 'react'

const LoginPage = () => {
    return (
        <>
            <Layouts
                navbar={<Navbar />}
                main={<Login />}
                footer={<Footer />}
            />
        </>
    )
}

export default LoginPage