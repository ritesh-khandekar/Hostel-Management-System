
import { Link, useNavigate } from "react-router-dom";
import icon from '../images/icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { faFileAlt, faKey, faSignOut, faTruckFast, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useEffect } from "react";
import { getData } from "../methods/methods";

function Student() {
    const [student_details, changeDetails] = useState({
        name: "Ritesh Khandekar",
        roll_number: "9135",
        room_number: "1",
        "hostel_number": "2"
    });
    const navigate = useNavigate()
    useEffect(() => {
        getData("students")
            .then(data => {
                if (!data.login) {
                    navigate('/login')
                } else {
                    changeDetails(data)
                }
            });
    }, [])
    return <>
        <div className="navbar py-3 px-lg-3 shadow-sm bg-white">
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
                        <Link to={"/dashboard/student"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3 active" aria-current="true">
                            <FontAwesomeIcon className="pe-3" icon={faUser} /> Student status
                        </Link>
                        <Link to={"/student/complaint"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3"><FontAwesomeIcon className="pe-3" icon={faFileAlt} /> Send a Complaint</Link>
                        <Link to={"/student/track"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3"><FontAwesomeIcon className="pe-3" icon={faTruckFast} /> Complaint Status</Link>
                        <Link to={"/student/changepwd"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3"><FontAwesomeIcon className="pe-3" icon={faKey} />Change Password</Link>
                        <Link to={"/logout"} className="list-group-item text-danger list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3"><FontAwesomeIcon className="pe-3" icon={faSignOut} />Logout</Link>
                    </div>
                </motion.div>
            </div>
            <div className="bg-white ms-auto p-4 rounded-4 shadow-lg w-50">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-sm">
                    <div className="welcome bg-gradient p-3 rounded text-white">
                        <h4 className="text-uppercase">Welcome Back! {student_details.name}</h4>
                        <p>Nice to see you here</p>
                    </div>
                    <div className="details my-2 p-3 shadow-sm rounded">
                        <p className="p-2">Name: <b className="ps-3">{student_details.name}</b> </p>
                        <p className="p-2">Roll Number: <b className="ps-3">{student_details.roll_number}</b> </p>
                        <p className="p-2">Hostel Number: <b className="ps-3">{student_details.hostel_number}</b> </p>
                        <p className="p-2">Room Number: <b className="ps-3">{student_details.room_number}</b> </p>
                    </div>
                </motion.div>
            </div>
        </div>
    </>
}
export default Student;