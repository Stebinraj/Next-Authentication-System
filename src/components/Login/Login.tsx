import React, { useState } from 'react'
import LoginForm from './LoginForm'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {

    const initialFormState = {
        email: '',
        password: ''
    };

    const initialFormErrors = {
        email: { message: '', inputClass: '', feedbackClass: '' },
        password: { message: '', inputClass: '', feedbackClass: '' }
    };

    const [formData, setFormData] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState(initialFormErrors);

    const router = useRouter();

    const clearForm = async () => {
        setFormData(initialFormState);
        setFormErrors(initialFormErrors)
    }

    const submitForm = async (e: FormDataEvent) => {
        try {
            e.preventDefault();
            const response = await axios.post('/api/users/login', formData);
            if (response && response.data.success) {
                toast.success('Login Successfully');
                clearForm();
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    return (
        <main className='grow break-all flex justify-center items-center flex-col'>
            {/* Login Form Component */}
            <LoginForm
                submitForm={submitForm}
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
            />

            <p className='mt-2'>Need and account? <Link href={'/'} replace={true} className='text-decoration-none'>SignUp</Link></p>
        </main>
    )
}

export default Login