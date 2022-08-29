import React, { useRef, useState, useEffect } from 'react'
import './Login.css'
import hostel from './hostel.png';
import { Link , useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { postData } from '../methods/methods';
import NavbarLight from '../navbar/NavbarStudentLight';

function Login() {
  const form = useRef(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if(success)
      navigate('/admin')
  }, [success]);

  function handleSubmit(e) {
    e.preventDefault();
    var formdata = new FormData(form.current);
    postData("admin/login", formdata).then(data => {
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
    <NavbarLight/>
      <div className="justify-content-center container">
        <div className="container justify-content-center logcontainer row  mt-4">
          <div className="container-sm icondiv col-6">
            <img src={hostel} alt="" id="hostelicon" />
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-sm  contentdiv col-6">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/login">Student</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/admin/login">Admin</Link>
              </li>
            </ul>
            <h1>Admin Login</h1>

            {success ? <div className='alert alert-success '>Login Successful!</div> : ""}
            {error.length > 0 ? <div className='alert alert-danger'>{error}</div> : ""}

            <form ref={form} onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name='password' className="form-control" id="exampleInputPassword1" />
              </div>
              <div id="emailHelp" className="form-text"><Link to="/">Forgot Password? Contact Admin</Link></div>
              <div className="role">
                {/* <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                      <label className="form-check-label" for="inlineRadio1">Student</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                      <label className="form-check-label" for="inlineRadio2">Admin</label>
                    </div> */}
              </div>
              <br />
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Login