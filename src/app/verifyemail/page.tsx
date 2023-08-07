'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const VerifyEmailPage = () => {

    const [token, setToken] = useState('');
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
                setError(true);
                console.error(error.message);
            }
        }
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <>
            <h1>Verify Email</h1>
            <h2>{token ? `${token}` : 'no token'}</h2>
            {verified && (
                <div>
                    <h2 className='text-2xl'>Email Verified</h2>
                </div>
            )}

            {error && (
                <div>
                    <h2 className='text-2xl bg-red-500 text-black'>Error</h2>
                </div>
            )}
        </>
    )
}

export default VerifyEmailPage