import Link from 'next/link'
import React from 'react'

const LoginForm = ({ submitForm, formData, setFormData, formErrors }: any) => {
    return (
        <>
            <div className="card col-12 col-md-8 col-lg-6">
                <div className="card-body">
                    <form className='row' onSubmit={submitForm}>
                        <h3 className='text-blue-700 text-center'>Login</h3>


                        <div className="form-group mb-2 col-12">
                            <label htmlFor="email" className='form-label'>Email</label>
                            <input type="text" className={`form-control ${formErrors.email.inputClass || ''}`} onChange={(e) => { setFormData({ ...formData, email: e.target.value.trim() }) }} value={formData.email} />
                            {formErrors.email.message && (
                                <small className={formErrors.email.feedbackClass}>{formErrors.email.message}</small>
                            )}
                        </div>

                        <div className="form-group mb-2 col-12">
                            <label htmlFor="username" className='form-label'>Password</label>
                            <input type="password" className={`form-control ${formErrors.password.inputClass || ''}`} onChange={(e) => { setFormData({ ...formData, password: e.target.value.trim() }) }} value={formData.password} />
                            {formErrors.password.message && (
                                <small className={formErrors.password.feedbackClass}>{formErrors.password.message}</small>
                            )}
                        </div>

                        <Link href={'/'} className='text-end text-decoration-none'><small>Forgot password?</small></Link>

                        <div className="form-group text-center mt-2">
                            <button type='submit' className='bg-blue-700 text-white px-4 py-2 rounded-3xl'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm