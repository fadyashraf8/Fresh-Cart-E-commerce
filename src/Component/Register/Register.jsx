import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { BaseUrl } from './../../utils/BaseUrl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Register() {

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


  function showRepassword() {
    document.getElementById("rePassword").type = "text"
    document.getElementById("showw").classList.add("d-none")
    document.getElementById("hidee").classList.remove("d-none")
  }

  function hideRepassword() {
    document.getElementById("rePassword").type = "password"
    document.getElementById("showw").classList.remove("d-none")
    document.getElementById("hidee").classList.add("d-none")
  }

  const notify = (msg, type) => {
    toast[type](msg)
  };

  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  let validationSchema = Yup.object({
    name: Yup.string().min(3).max(30).required(),
    email: Yup.string().email().required(),
    password: Yup.string().matches(/^[A-Z][a-z0-9@#$%]{5,}$/, "password must match the pattern").required(),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "password and rePassword not match").required(),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid number").required(),
  })


  let registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      axios.post(`${BaseUrl}/auth/signup`, values).then((data) => {
        
        navigate("/login")
        setLoading(false)
        notify("success", 'success')

      }).catch((err) => {
        setLoading(false)
        console.log(err.response.data.message);
        
        notify(err.response.data.message, "error")
      })
    }
  })
  return (
    <>
      <div className='w-75 m-auto my-5'>
        <h2>Register Now :</h2>
        <form onSubmit={registerFormik.handleSubmit} className='position-relative'>

          <label htmlFor="name">Name :</label>
          <input onBlur={registerFormik.handleBlur} value={registerFormik.values.name} onChange={registerFormik.handleChange} type="text" className='form-control my-3' name='name' id='name' />

          {registerFormik.errors.name && registerFormik.touched.name ? <div className='alert alert-danger'>
            {registerFormik.errors.name}
          </div> : ""}

          <label htmlFor="email">Email :</label>
          <input onBlur={registerFormik.handleBlur} value={registerFormik.values.email} onChange={registerFormik.handleChange} type="email" className='form-control my-3' name='email' id='email' />
          {registerFormik.errors.email && registerFormik.touched.email ? <div className='alert alert-danger'>
            {registerFormik.errors.email}
          </div> : ""}

          <label htmlFor="password" >Password :</label>
          <input onBlur={registerFormik.handleBlur} value={registerFormik.values.password} onChange={registerFormik.handleChange} type="password" className='form-control my-3' name='password' id='password' />
          <p className='fs-2 border border-2 rounded-5 text-center'>Use This Password : Pass123</p>
          <label id='show' onClick={showPassword} className='btn btn-sm btn-dark'>Show Password</label>
          <label id='hide' onClick={hidePassword} className='btn btn-sm btn-dark d-none'>Hide Password</label>
          {registerFormik.errors.password && registerFormik.touched.password ? <div className='alert alert-danger'>
            {registerFormik.errors.password}
          </div> : ""}

          <label htmlFor="rePassword" className='d-block mt-3'>rePassword :</label>
          <input onBlur={registerFormik.handleBlur} value={registerFormik.values.rePassword} onChange={registerFormik.handleChange} type="password" className='form-control my-3' name='rePassword' id='rePassword' />

          <label id='showw' onClick={showRepassword} className='btn btn-sm btn-dark'>Show rePassword</label>
          <label id='hidee' onClick={hideRepassword} className='btn btn-sm btn-dark d-none'>Hide rePassword</label>

          {registerFormik.errors.rePassword && registerFormik.touched.rePassword ? <div className='alert alert-danger'>
            {registerFormik.errors.rePassword}
          </div> : ""}

          <label htmlFor="phone" className='d-block mt-3'>phone :</label>
          <input onBlur={registerFormik.handleBlur} value={registerFormik.values.phone} onChange={registerFormik.handleChange} className='form-control my-3' name='phone' id='phone' />

          {registerFormik.errors.phone && registerFormik.touched.phone ? <div className='alert alert-danger'>
            {registerFormik.errors.phone}
          </div> : ""}

          <button type='submit' disabled={!(registerFormik.isValid && registerFormik.dirty && !loading)} className='btn bg-main text-white'>

            {!loading ? "Register" : <i class="fas fa-spinner fa-spin"></i>}

          </button>
        </form>
      </div>

    </>
  )
}
