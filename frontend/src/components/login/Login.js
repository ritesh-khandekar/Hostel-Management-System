import React from 'react'
import './Login.css'
import hostel from './hostel.png';
import {motion} from 'framer-motion'
function Login() {
  return (
<>
<div className="justify-content-center container">
<div className="container justify-content-center logcontainer row  mt-4">
    <div className="container-sm icondiv col-6">
    <img src={hostel} alt="" id="hostelicon" />
    </div>
<motion.div initial={{opacity:0}} animate={{opacity:1}} className="container-sm  contentdiv col-6">
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="/">Student</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="/">Admin</a>
  </li>
 
</ul>
    <h1>Login</h1>
<form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" />
  </div>
  <div id="emailHelp" class="form-text"><a href="/">Forgot Password? Contact Admin</a></div>
<div className="role">
{/* <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
  <label class="form-check-label" for="inlineRadio1">Student</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
  <label class="form-check-label" for="inlineRadio2">Admin</label>
</div> */}

</div>
<br />
  <button type="submit" class="btn btn-primary">Login</button>
</form>
</motion.div>
</div>
</div>
</>
  )
}

export default Login