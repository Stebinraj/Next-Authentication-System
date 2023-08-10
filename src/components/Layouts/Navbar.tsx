import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar break-all bg-blue-500">
            <div className="container-fluid">
                <Link href={'/'} className="navbar-brand text-center mx-auto text-white">Email Login System</Link>
            </div>
        </nav>
    )
}

export default Navbar