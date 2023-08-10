import React from 'react'

const SignUpForm = ({ submitForm, formData, setFormData, formErrors }: any) => {
    return (
        <>
            <div className="card col-12 col-md-8 col-lg-6">
                <div className="card-body">
                    <form className='row' onSubmit={submitForm}>
                        <h3 className='text-blue-500 text-center'>SignUp</h3>

                        <div className="form-group mb-2 col-12 col-md-6">
                            <label htmlFor="username" className='form-label'>Username</label>
                            <input type="text" className={`form-control ${formErrors.userName.inputClass || ''}`} onChange={(e) => { setFormData({ ...formData, userName: e.target.value }) }} value={formData.userName} />
                            {formErrors.userName.message && (
                                <small className={formErrors.userName.feedbackClass}>{formErrors.userName.message}</small>
                            )}
                        </div>

                        <div className="form-group mb-2 col-12 col-md-6">
                            <label htmlFor="email" className='form-label'>Email</label>
                            <input type="text" className={`form-control ${formErrors.email.inputClass || ''}`} onChange={(e) => { setFormData({ ...formData, email: e.target.value.trim() }) }} value={formData.email} />
                            {formErrors.email.message && (
                                <small className={formErrors.email.feedbackClass}>{formErrors.email.message}</small>
                            )}
                        </div>

                        <div className="form-group mb-2 col-12 col-md-6">
                            <label htmlFor="phonenumber" className='form-label'>Phone Number</label>
                            <input type='text' className={`form-control ${formErrors.phoneNumber.inputClass || ''}`} onChange={(e) => { setFormData({ ...formData, phoneNumber: e.target.value.trim().replace(/[^0-9]/g, '') }) }} value={formData.phoneNumber} />
                            {formErrors.phoneNumber.message && (
                                <small className={formErrors.phoneNumber.feedbackClass}>{formErrors.phoneNumber.message}</small>
                            )}
                        </div>

                        <div className="form-group mb-2 col-12 col-md-6">
                            <label htmlFor="username" className='form-label'>Password</label>
                            <input type="password" className={`form-control ${formErrors.password.inputClass || ''}`} onChange={(e) => { setFormData({ ...formData, password: e.target.value.trim() }) }} value={formData.password} />
                            {formErrors.password.message && (
                                <small className={formErrors.password.feedbackClass}>{formErrors.password.message}</small>
                            )}
                        </div>

                        <div className="form-group text-center mt-2">
                            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-3xl'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUpForm