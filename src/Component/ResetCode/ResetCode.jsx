import React, { useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { BaseUrl } from '../../utils/BaseUrl.js';
import { useNavigate } from 'react-router-dom';


export default function ResetCode() {
    let [errorApi, setErrorApi] = useState(null)
    let navigate = useNavigate()


    let validationSchema = Yup.object({
        resetCode: Yup.string().required().matches(/^[0-9]+$/),
    })

    const restCodeFormik = useFormik({
        initialValues: {
            resetCode: '',
        },
        validationSchema,
        onSubmit: values => {
            console.log(values);
            axios.post(`${BaseUrl}/auth/verifyResetCode`, values).then((data) => {
                navigate("/resetPassword")
            }).catch((err) => {
                setErrorApi(err.response.data.message)
            })
        },
    });

    return (
        <div className='my-5'>
            <form action="" onSubmit={restCodeFormik.handleSubmit}>
                <label htmlFor="resetCode">Send Code</label>

                <input type="text" className='form-control my-2 w-25' id='resetCode' name='resetCode' onChange={restCodeFormik.handleChange} onBlur={restCodeFormik.handleBlur} value={restCodeFormik.values.resetCode} />


                {restCodeFormik.errors.resetCode && restCodeFormik.touched.resetCode ? <div className='alert alert-danger'>
                    {restCodeFormik.errors.resetCode}
                </div> : ""}

                {errorApi !== null ? <div className='alert alert-danger'>
                    {errorApi}
                </div> : ""}

                <button type='submit' disabled={!(restCodeFormik.isValid && restCodeFormik.dirty)} className='btn btn-control btn-success my-2'>Verify Code</button>
            </form>
        </div>
    )
}
