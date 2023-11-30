import React, { useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl.js';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {


    function showPassword() {
        document.getElementById("newPassword").type = "text"
        document.getElementById("show").classList.add("d-none")
        document.getElementById("hide").classList.remove("d-none")
    }

    function hidePassword() {
        document.getElementById("newPassword").type = "password"
        document.getElementById("show").classList.remove("d-none")
        document.getElementById("hide").classList.add("d-none")
    }

    let [errorApi, setErrorApi] = useState(null)
    let navigate = useNavigate()

    let validationSchema = Yup.object({
        email: Yup.string().email().required(),
        newPassword: Yup.string().matches(/^[A-Z][a-z0-9@#$%]{5,}$/, "password must match the pattern").required(),
    })

    const resetPasswordFormik = useFormik({
        initialValues: {
            email: '',
            newPassword: '',

        },
        validationSchema,
        onSubmit: values => {
            console.log(values);
            axios.put(`${BaseUrl}/auth/resetPassword`, values).then((data) => {
                console.log(data.data);
                navigate("/login")
            }).catch((err) => {
                console.log(err.response.data.message);
                setErrorApi(err.response.data.message)
            })
        },
    });

    return (
        <div className='my-5'>
            <form action="" onSubmit={resetPasswordFormik.handleSubmit}>
                <label htmlFor="email">Email :</label>

                <input onChange={resetPasswordFormik.handleChange} onBlur={resetPasswordFormik.handleBlur} value={resetPasswordFormik.values.email} type="email" className='form-control my-2 ' id='email' name='email' />


                {resetPasswordFormik.errors.email && resetPasswordFormik.touched.email ? <div className='alert alert-danger'>
                    {resetPasswordFormik.errors.email}
                </div> : ""}

                <label htmlFor="newPassword">New Password :</label>

                <input onChange={resetPasswordFormik.handleChange} onBlur={resetPasswordFormik.handleBlur} value={resetPasswordFormik.values.newPassword} type="password" className='form-control my-2 ' id='newPassword' name='newPassword' />
                <label id='show' onClick={showPassword} className='btn btn-sm btn-dark'>Show Password</label>
                <label id='hide' onClick={hidePassword} className='btn btn-sm btn-dark d-none'>Hide Password</label>

                {resetPasswordFormik.errors.newPassword && resetPasswordFormik.touched.newPassword ? <div className='alert alert-danger'>
                    {resetPasswordFormik.errors.newPassword}
                </div> : ""}

                {errorApi !== null ? <div className='alert alert-danger'>
                    {errorApi}
                </div> : ""}

                <button type='submit' disabled={!(resetPasswordFormik.isValid && resetPasswordFormik.dirty)} className='btn btn-control btn-success my-2 d-block'>Reset Password</button>
            </form>
        </div>
    )
}
