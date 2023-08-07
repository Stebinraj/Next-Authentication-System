'use client';
import Footer from '@/components/Layouts/Footer';
import Layouts from '@/components/Layouts/Layouts'
import Navbar from '@/components/Layouts/Navbar';
import UpdatePassword from '@/components/UpdatePassword/UpdatePassword';
import React from 'react'

const UpdatePasswordPage = () => {
    return (
        <>
            <Layouts
                navbar={<Navbar />}
                main={<UpdatePassword />}
                footer={<Footer />}
            />
        </>
    )
}

export default UpdatePasswordPage