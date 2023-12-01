import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import { BaseUrl } from './../../utils/BaseUrl';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext.js';
export default function Login() {
  let { SaveUserData } = useContext(AuthContext)
  const notify = (msg, type) => {
    toast[type](msg)
  };

  function showPassword() {
    document.getElementById("password").type = "text"
    document.getElementById("show").classList.add("d-none")
    document.getElementById("hide").classList.remove("d-none")
  }

  function hidePassword() {
    document.getElementById("password").type = "password"
    document.getElementById("show").classList.remove("d-none")
    document.getElementById("hide").classList.add("d-none")
  }

  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  let validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().matches(/^[A-Z][a-z0-9@#$%]{5,}$/, "password must match the pattern").required(),
  })


  let loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      axios.post(`${BaseUrl}/auth/signin`, values).then((data) => {
        localStorage.setItem("token", data.data.token)
        navigate("/")
        SaveUserData()
        setLoading(false)
        notify("success", 'success')
  

      }).catch((err) => {

        setLoading(false)
        notify(err.response.data.message, "error")
      })
    }
  })
  return (
    <>
      <div className='w-75 m-auto my-5 '>
        <h2>Login Now :</h2>
        <form onSubmit={loginFormik.handleSubmit} className=''>



          <label htmlFor="email">Email :</label>
          <input onBlur={loginFormik.handleBlur} value={loginFormik.values.email} onChange={loginFormik.handleChange} type="email" className='form-control my-3' name='email' id='email' />
          {loginFormik.errors.email && loginFormik.touched.email ? <div className='alert alert-danger'>
            {loginFormik.errors.email}
          </div> : ""}

          <label htmlFor="password">Password :</label>
          <input onBlur={loginFormik.handleBlur} value={loginFormik.values.password} onChange={loginFormik.handleChange} type="password" className='form-control my-3' name='password' id='password' />
          <label id='show' onClick={showPassword} className='btn btn-sm btn-dark'>Show Password</label>
          <label id='hide' onClick={hidePassword} className='btn btn-sm btn-dark d-none'>Hide Password</label>

          {loginFormik.errors.password && loginFormik.touched.password ? <div className='alert alert-danger'>
            {loginFormik.errors.password}
          </div> : ""}

          <Link className='d-flex my-4 btn-outline-dark btn fs-5 w-25' to='/forgetPassword'>Forget Password ?</Link>



          <button type='submit' disabled={!(loginFormik.isValid && loginFormik.dirty && !loading)} className='btn bg-main text-white'>

            {!loading ? "Login" : <i class="fas fa-spinner fa-spin"></i>}

          </button>
        </form>
      </div>

    </>
  )
}
