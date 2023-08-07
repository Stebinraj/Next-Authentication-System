import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

const VerifyEmail = () => {

    const [token, setToken] = useState();
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const urlToken: any = new URLSearchParams(window.location.search).get('token');
        setToken(urlToken);
    }, []);

    useEffect(() => {
        const verifyUserEmail = async () => {
            try {
                const response = await axios.post('/api/users/verifyemail', { token });
                if (response && response.data.success) {
                    setVerified(true);
                    router.replace('/login');
                }
            } catch (error: any) {
                setError(error.message);
                console.error(error.message);
            }
        }
        if (token) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <>
            <main className='grow break-all flex justify-center items-center flex-col'>
                <h1>Verify Email</h1>
                <h2>{token ? `${token}` : 'no token'}</h2>
                {verified && (
                    <div>
                        <h2 className='text-2xl bg-green-500 text-black'>Email Verified</h2>
                    </div>
                )}

                {error && (
                    <div>
                        <h2 className='text-2xl bg-red-500 text-black'>{error}</h2>
                    </div>
                )}
            </main>
        </>
    )
}

export default VerifyEmail