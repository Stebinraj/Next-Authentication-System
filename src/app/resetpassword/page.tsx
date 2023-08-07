'use client';
import Footer from '@/components/Layouts/Footer';
import Layouts from '@/components/Layouts/Layouts';
import Navbar from '@/components/Layouts/Navbar';
import ResetPassword from '@/components/ResetPassword/ResetPassword';
import React from 'react'

const ResetPasswordPage = () => {
    return (
        <>
            <Layouts
                navbar={<Navbar />}
                main={<ResetPassword />}
                footer={<Footer />}
            />
        </>
    )
}

export default ResetPasswordPage