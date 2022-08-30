import React, { useEffect, useRef, useState } from 'react';
import icon from '../images/icon.png';
import "./common.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { faFileAlt, faKey, faAngleRight, faSignOut, faTruckFast, faUser } from '@fortawesome/free-solid-svg-icons';

function ChangePwd() {
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
    function handleSubmit() {

    }
    return <>
        <div className="navbar py-3 px-lg-3">
            <div className="items-left">
                <Link className='' to={'/'}><img className='' src={icon} height="60" /></Link>
            </div>
            <div className="items-right">
                <Link className='btn btn-outline-primary px-lg-4 mx-1 mx-lg-2 rounded-5' to={'/'}>Home</Link>
                <Link className='btn btn-outline-primary active mx-1 mx-lg-2 px-lg-4 rounded-5' to={'/dashboard/student'}>Dashboard</Link>
                <div className="dropdown d-inline-block px-2 mx-2 rounded-5">
                    <i className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <FontAwesomeIcon icon={faUser} />
                    </i>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <Link to={"/logout"} className="dropdown-item">Logout</Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="d-flex align-items-center pt-5 container h-100 w-100 p-3">
            <div className="bg-white p-4 rounded-4 shadow-lg">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-sm">
                    <div className="list-group list-group-flush">
                        <Link to={"/dashboard/student"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3" aria-current="true">
                            <FontAwesomeIcon className="pe-3" icon={faUser} /> Student status
                        </Link>
                        <Link to={"/student/complaint"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3"><FontAwesomeIcon className="pe-3" icon={faFileAlt} /> Send a Complaint</Link>
                        <Link to={"/student/track"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3"><FontAwesomeIcon className="pe-3" icon={faTruckFast} /> Complaint Status</Link>
                        <Link to={"/student/changepwd"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3 active"><FontAwesomeIcon className="pe-3" icon={faKey} />Change Password</Link>
                        <Link to={"/logout"} className="list-group-item text-danger list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3"><FontAwesomeIcon className="pe-3" icon={faSignOut} />Logout</Link>
                    </div>
                </motion.div>
            </div>
            <div className="bg-white w-50 ms-auto text-center p-4 rounded-4 shadow-lg">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-sm">

                    <h1 className='py-4 login-text'>Change Password</h1>

                    {success ? <div className='alert alert-success '>Login Successful!</div> : ""}
                    {error.length > 0 ? <div className='alert alert-danger'>{error}</div> : ""}

                    <form ref={form} onSubmit={handleSubmit}>
                        <div className="form-group mb-5">
                            <input type="old_pwd" name='new_pwd' placeholder='Enter Old Password' className="form-control p-2" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group my-4">
                            <input type="new_pwd" name='new_pwd' placeholder='Enter New Password' className="form-control p-2" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group my-4">
                            <input type="password" name='password' className="form-control p-2" placeholder='Enter your Password' id="exampleInputPassword1" />
                        </div>
                        <div id="emailHelp" className="form-text pb-4"><Link className='text-decoration-none' to="/">Forgot Password? Contact Admin</Link></div>
                        <button type="submit" className="btn btn-primary py-3 px-5 shadow btn_main">Change Password <FontAwesomeIcon icon={faAngleRight} /> </button>
                    </form>

                </motion.div>
            </div>
        </div>
    </>
}
export default ChangePwd;