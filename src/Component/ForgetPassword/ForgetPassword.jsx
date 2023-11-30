import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { BaseUrl } from '../../utils/BaseUrl.js';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {

    let [errorApi, setErrorApi] = useState(null)

    let navigate=useNavigate()
    
    let validationSchema = Yup.object({
        email: Yup.string().email().required(),
    })

    const forgetPasswordFormik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: values => {
            console.log(values);
            axios.post(`${BaseUrl}/auth/forgotPasswords`, values).then((data) => {
                navigate('/resetCode')
            }).catch((err) => {
               
                setErrorApi(err.response.data.message)
            })
        },
    });
    return (
        <div className='my-5'>
            <form  onSubmit={forgetPasswordFormik.handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text" value={forgetPasswordFormik.values.email} onBlur={forgetPasswordFormik.handleBlur} onChange={forgetPasswordFormik.handleChange} className='form-control my-2' id='email' name='email' />

                {forgetPasswordFormik.errors.email && forgetPasswordFormik.touched.email ? <div className='alert alert-danger'>
                    {forgetPasswordFormik.errors.email}
                </div> : ""}

                {errorApi !== null ?   <div className='alert alert-danger'>
                        {errorApi}
                      
                    </div> : ""}

                <button type='submit' disabled={!(forgetPasswordFormik.isValid && forgetPasswordFormik.dirty)} className='btn btn-control btn-success my-2'>Send</button>
            </form>
        </div>
    )
}
