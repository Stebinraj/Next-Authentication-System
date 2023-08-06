import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

const Dashboard = () => {

    const [id, setId] = useState();

    const router = useRouter();

    const logout = async (e: FormEvent) => {
        e.preventDefault();
        const response = await axios.get('/api/users/logout');
        if (response && response.data.success) {
            router.replace('/login');
        }
    }

    const getUserId = async (e: FormEvent) => {
        e.preventDefault();
        const response = await axios.get('/api/users/id');
        if (response && response.data.success) {
            setId(response.data.id);
        }
    }

    return (
        <>
            <main className='grow break-all flex flex-col justify-center items-center'>

                <p>Your id is : {id}</p>
                <button onClick={getUserId} className='bg-blue-700 text-white px-4 py-2 rounded-3xl'>Get Id</button>
                <button onClick={logout} className='bg-blue-700 text-white px-4 py-2 rounded-3xl'>Logout</button>
            </main>
        </>
    )
}

export default Dashboard