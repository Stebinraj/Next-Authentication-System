import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import UpdatePasswordForm from './UpdatePasswordForm';

const UpdatePassword = () => {

    const initialFormState = {
        password: ''
    };

    const initialFormErrors = {
        password: { message: '', inputClass: '', feedbackClass: '' }
    };

    const [formData, setFormData] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [token, setToken] = useState();

    const router = useRouter();

    const clearForm = async () => {
        setFormData(initialFormState);
        setFormErrors(initialFormErrors)
    }

    const submitForm = async (e: FormDataEvent) => {
        try {
            e.preventDefault();
            const response = await axios.post('/api/users/updatepassword', {
                token: token,
                password: formData.password
            });
            if (response && response.data.message) {
                toast.success(response.data.message);
                clearForm();
                router.replace('/login');
            }
        } catch (error: any) {
            setFormErrors(initialFormErrors);
            if (error.response && Array.isArray(error.response.data.message)) {
                for (let i of error.response.data.message) {
                    let { message, field } = i;
                    setFormErrors((formErrors) => ({
                        ...formErrors,
                        [field]: {
                            message: message, inputClass: 'is-invalid',
                            feedbackClass: 'invalid-feedback'
                        }
                    }));
                }
            } else {
                toast.error(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        const urlToken: any = new URLSearchParams(window.location.search).get('token');
        setToken(urlToken);
    }, [token]);


    return (
        <>
            <main className='grow break-all flex justify-center items-center flex-col'>
                {/* Update password form component */}
                <UpdatePasswordForm
                    submitForm={submitForm}
                    formData={formData}
                    setFormData={setFormData}
                    formErrors={formErrors}
                />
            </main>
        </>
    )
}

export default UpdatePassword