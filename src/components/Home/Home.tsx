import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Home = () => {

    const initialFormState = {
        userName: '',
        email: '',
        phoneNumber: '',
        password: ''
    };

    const initialFormErrors = {
        userName: { message: '', inputClass: '', feedbackClass: '' },
        email: { message: '', inputClass: '', feedbackClass: '' },
        phoneNumber: { message: '', inputClass: '', feedbackClass: '' },
        password: { message: '', inputClass: '', feedbackClass: '' }
    };

    const [formData, setFormData] = useState(initialFormState);

    const [formErrors, setFormErrors] = useState(initialFormErrors);

    const clearForm = async () => {
        setFormData(initialFormState);
        setFormErrors(initialFormErrors)
    }

    const submitForm = async (e: FormDataEvent) => {
        try {
            e.preventDefault();
            const response = await axios.post('/api/users/signup', formData);
            if (response && response.data.success) {
                toast.success('Form Submitted');
                clearForm();
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    return (
        <main className='grow break-all flex justify-center items-center'>
            {/* Signup Form Component */}
            <SignUpForm
                submitForm={submitForm}
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
            />
        </main>
    )
}

export default Home