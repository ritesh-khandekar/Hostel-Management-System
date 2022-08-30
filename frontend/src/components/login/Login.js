import React, { useEffect, useRef, useState } from 'react'
// import './Login.css'
import icon from '../images/icon.png'
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { postData } from '../methods/methods';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';


function Login() {
  const form = useRef(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (success)
      setTimeout(() => {
        navigate('/dashboard/student')
      }, 2000);
  }, [success])

  function handleSubmit(e) {
    e.preventDefault();
    var formdata = new FormData(form.current);
    postData("students/login", formdata).then(data => {
      console.log(data)
      if (typeof data !== "undefined" && data["success"]) {
        setSuccess(true);
        setError("");
      } else {
        setError(data["message"]);
        setSuccess(false);
      }
    })
  }
  return (
    <>
      <div className="navbar py-3 px-lg-3 mx-4">
        <div className="items-left">
          <Link className='' to={'/'}><img className='' src={icon} height="60" /></Link>
        </div>
        <div className="items-right">
          <Link className='btn btn-outline-primary px-lg-4 mx-1 mx-lg-2 rounded-5' to={'/'}>Home</Link>
          <Link className='btn btn-outline-primary active px-lg-4 mx-1 mx-lg-2 rounded-5' to={'/login'}>Login</Link>
        </div>
      </div>
      <div className="container_main">
        <div className="block_main bg-white p-4 rounded-4 shadow-lg">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-sm">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">Student</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/login">Admin</Link>
              </li>
            </ul>

            <h1 className='py-4 login-text'>Student Login</h1>

            {success ? <div className='alert alert-success '>Login Successful!</div> : ""}
            {error.length > 0 ? <div className='alert alert-danger'>{error}</div> : ""}

            <form ref={form} onSubmit={handleSubmit}>
              <div className="form-group my-3">
                <input type="email" name='email' placeholder='Enter your Email' className="form-control p-2" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="form-group my-4">
                <input type="password" name='password' className="form-control p-2" placeholder='Enter your Password' id="exampleInputPassword1" />
              </div>
              <div id="emailHelp" className="form-text"><Link className='text-decoration-none' to="/">Forgot Password? Contact Admin</Link></div>
              <button type="submit" className="btn btn-primary py-2 px-5 shadow btn_main">Login <FontAwesomeIcon icon={ faAngleRight} /> </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Login