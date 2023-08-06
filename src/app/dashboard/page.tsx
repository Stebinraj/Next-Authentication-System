'use client';
import Dashboard from '@/components/Dashboard/Dashboard';
import Footer from '@/components/Layouts/Footer'
import Layouts from '@/components/Layouts/Layouts'
import Navbar from '@/components/Layouts/Navbar'
import React from 'react'

const DashboardPage = () => {
    return (
        <>
            <Layouts
                navbar={<Navbar />}
                main={<Dashboard />}
                footer={<Footer />}
            />
        </>
    )
}

export default DashboardPage