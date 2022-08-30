import React, { useEffect, useRef, useState } from 'react';
import icon from '../images/icon.png';
import "./common.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { faSignOut, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import { getData } from '../methods/methods';
import Table from "./Table";

function ChangePwd() {
    const form = useRef(null);
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [admin, adminDetails] = useState({
        name: "Ritesh Khandakar"
    })
    useEffect(()=>{
        getData("").then(data => {
            if(data.hasOwnProperty("admin_login")){
                adminDetails(data)
            }else{
                navigate("/admin/login")
            }
        })
    },[])


    return <>
        <div className="navbar py-3 px-lg-3">
            <div className="items-left">
                <Link className='' to={'/'}><img className='ps-lg-3' src={icon} height="60" /></Link>
            </div>
            <div className="items-right">
                <Link className='btn btn-outline-primary px-lg-4 mx-1 mx-lg-2 rounded-5' to={'/'}><FontAwesomeIcon icon={faHome} /> Home</Link>
                <Link className='btn btn-outline-primary active mx-1 mx-lg-2 px-lg-4 rounded-5' to={'/dashboard/student'}>Dashboard</Link>
                <Link className='btn btn-outline-danger mx-1 mx-lg-2 px-lg-4 rounded-5' to={'/logout'}>Logout<FontAwesomeIcon className='ps-2' icon={faSignOut} /></Link>
            </div>
            <div className="items-center">
                <i>
                    <b className='px-3'>Admin <FontAwesomeIcon icon={faUser} /> : {admin.name} </b>
                </i>
            </div>
        </div>
        <div className="d-flex align-items-center justify-content-center container h-100 w-100 p-3">
            <div className="bg-white text-center p-4 rounded-4 shadow-lg w-100">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-sm">
                <Table />
                </motion.div>
            </div>
        </div>
    </>
}
export default ChangePwd;