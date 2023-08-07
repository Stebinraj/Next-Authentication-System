import React from 'react'

const UpdatePasswordForm = ({ submitForm, formData, setFormData, formErrors }: any) => {
    return (
        <>
            <div className="card col-12 col-md-8 col-lg-6">
                <div className="card-body">
                    <form className='row' onSubmit={submitForm}>
                        <h3 className='text-blue-700 text-center'>Update Password</h3>

                        <div className="form-group mb-2 col-12">
                            <label htmlFor="username" className='form-label'>Password</label>
                            <input type="password" className={`form-control ${formErrors.password.inputClass || ''}`} onChange={(e) => { setFormData({ ...formData, password: e.target.value.trim() }) }} value={formData.password} />
                            {formErrors.password.message && (
                                <small className={formErrors.password.feedbackClass}>{formErrors.password.message}</small>
                            )}
                        </div>

                        <div className="form-group text-center mt-2">
                            <button type='submit' className='bg-blue-700 text-white px-4 py-2 rounded-3xl'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdatePasswordForm