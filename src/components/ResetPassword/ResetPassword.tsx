import React, { useState } from 'react'
import ResetPasswordForm from './ResetPasswordForm';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {

    const initialFormState = {
        email: '',
    };

    const initialFormErrors = {
        email: { message: '', inputClass: '', feedbackClass: '' }
    };

    const [formData, setFormData] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState(initialFormErrors);

    const clearForm = async () => {
        setFormData(initialFormState);
        setFormErrors(initialFormErrors)
    }

    const submitForm = async (e: any) => {
        try {
            e.preventDefault();
            const response = await axios.post('/api/users/resetpassword', formData);
            if (response && response.data.success) {
                toast.success('Password reset mailed Successfully');
                clearForm();
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    return (
        <>
            <main className='grow break-all flex justify-center items-center flex-col'>
                {/* Reset Password form component */}
                <ResetPasswordForm
                    submitForm={submitForm}
                    formData={formData}
                    setFormData={setFormData}
                    formErrors={formErrors}
                />
            </main>
        </>
    )
}

export default ResetPassword