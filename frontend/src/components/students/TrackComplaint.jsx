
import { getData } from '../methods/methods'
import React, { useEffect, useRef, useState } from 'react';
import icon from '../images/icon.png';
import "./common.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { faFileAlt, faKey, faAngleRight, faSignOut, faTruckFast, faUser } from '@fortawesome/free-solid-svg-icons';


function TrackComplaint() {
    const [res_json, updateRes] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        getData("students")
            .then(data => {
                if (!data.login) {
                    navigate('/login')
                } else {
                    updateRes(data)
                }
            });
    }, []);
    const [complaints, updateComplaints] = useState([]);
    useEffect(() => {
        getData("complaints")
            .then(data => {
                if (!data) {

                } else {
                    updateComplaints(data)
                }
            });
    }, []);


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
                        <Link to={"/student/track"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3 active"><FontAwesomeIcon className="pe-3" icon={faTruckFast} /> Complaint Status</Link>
                        <Link to={"/student/changepwd"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3"><FontAwesomeIcon className="pe-3" icon={faKey} />Change Password</Link>
                        <Link to={"/logout"} className="list-group-item text-danger list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3"><FontAwesomeIcon className="pe-3" icon={faSignOut} />Logout</Link>
                    </div>
                </motion.div>
            </div>
            <div className="bg-white ms-auto text-center p-4 rounded-4 shadow">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-sm">
                    {!(complaints.length > 0) ? <h4 className="p-5">No Complaints Sent</h4> : <h2 className="text-uppercase">Sent Complaints</h2>}
                    <table className="table shadow-sm my-4">
                        <thead className="bg-primary">
                            <tr>
                                <td className="text-white">Sent Date</td>
                                <td className="text-white">Issue Type</td>
                                <td className="text-white">Status</td>
                                <td className="text-white">Admin Name</td>
                                <td className="text-white">Officer</td>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.length > 0 ? complaints.map((c,i) => 
                                <tr key={i}>
                                    <td>{c.createdAt}</td>
                                    <td>{c.issue_type}</td>
                                    <td>{c.status==null ? <p className="alert alert-secondary m-0 px-2 p-0">PENDING</p> : (c.status == "ACCEPT" ? <p className="alert alert-success m-0 px-2 p-0">{c.status}</p>:<p className="alert alert-warning m-0 px-2 p-0">{c.status}</p>)}</td>
                                    <td>{c.handler_name}</td>
                                    <td>{c.level}</td>
                                </tr>
                            ) : ""}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </div>
    </>;
}
export default TrackComplaint;