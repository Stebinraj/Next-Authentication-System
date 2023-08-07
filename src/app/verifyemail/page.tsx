'use client';
import Footer from '@/components/Layouts/Footer';
import Layouts from '@/components/Layouts/Layouts';
import Navbar from '@/components/Layouts/Navbar';
import VerifyEmail from '@/components/VerifyEmail/VerifyEmail';
import React from 'react'

const VerifyEmailPage = () => {
    return (
        <>
            <Layouts
                navbar={<Navbar />}
                main={<VerifyEmail />}
                footer={<Footer />}
            />
        </>
    )
}

export default VerifyEmailPage