import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast';

const Dashboard = () => {

    const [id, setId] = useState();

    const router = useRouter();

    const logout = async (e: FormEvent) => {
        try {
            e.preventDefault();
            const response = await axios.post('/api/users/logout');
            if (response && response.data.message) {
                toast.success(response.data.message);
                router.push('/login');
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    const getUserId = async (e: FormEvent) => {
        try {
            e.preventDefault();
            const response = await axios.get('/api/users/id');
            if (response && response.data.id) {
                setId(response.data.id);
            }
        } catch (error: any) {
            setId(error.response.data.message);
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <main className='grow break-all flex flex-col justify-center items-center'>

                <p>Your id is : {id}</p>
                <button onClick={getUserId} className='bg-blue-700 text-white px-4 py-2 rounded-3xl'>Get Id</button>
                <button onClick={logout} className='bg-blue-700 text-white px-4 py-2 rounded-3xl mt-2'>Logout</button>
            </main>
        </>
    )
}

export default Dashboard