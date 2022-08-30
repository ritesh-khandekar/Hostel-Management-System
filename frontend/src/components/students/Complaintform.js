import React, { useEffect } from 'react'
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getData, postData } from '../methods/methods'
import TextArea from './TextArea'
import "./common.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import icon from '../images/icon.png';
import { faFileAlt, faKey, faSignOut, faTruckFast, faUser } from '@fortawesome/free-solid-svg-icons';


function ComplaintForm() {
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
  }, [])

  const [user] = useState(res_json);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null)
  const form = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    var formdata = new FormData(form.current);
    postData("complaints", formdata)
      .then(json => {
        // console.log(json)
        if (json["success"]) {
          setSuccess(true);
          setError(null);
        } else {
          setError(json["message"]);
          setSuccess(false);
        }
      });
  }
  return (
    <>
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
              <Link to={"/student/complaint"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3 active"><FontAwesomeIcon className="pe-3" icon={faFileAlt} /> Send a Complaint</Link>
              <Link to={"/student/track"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3"><FontAwesomeIcon className="pe-3" icon={faTruckFast} /> Complaint Status</Link>
              <Link to={"/student/changepwd"} className="list-group-item list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3"><FontAwesomeIcon className="pe-3" icon={faKey} />Change Password</Link>
              <Link to={"/logout"} className="list-group-item text-danger list-group-item-action px-5 my-2 text-uppercase shadow-sm rounded-3 py-3"><FontAwesomeIcon className="pe-3" icon={faSignOut} />Logout</Link>
            </div>
          </motion.div>
        </div>

        <div className="bg-white w-50 ms-auto p-4 rounded-4 shadow-lg">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-sm">
              <h1 className='text-center'>Student Complaint</h1>
              <div className={success ? "" : "d-none"}><div className="alert alert-success">Complaint sent Successfully!</div></div>
              <div className={error ? "" : "d-none"}><div className="alert alert-danger">{error}</div></div>

              <form className="row g-3" ref={form} onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label htmlFor="inputEmail4" className="form-label">
                    Name
                  </label>
                  <input type="text" className="form-control" name='name' defaultValue={user.name} id="name" />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputPassword4" className="form-label">
                    Roll Number
                  </label>
                  <input type="number" className="form-control" name='roll_number' defaultValue={user.roll_number} id="rollno" />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputEmail4" className="form-label">
                    Hostel Number
                  </label>
                  <input type="text" className="form-control" id="name" name='hostel_number' defaultValue={user.hostel_number} />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputPassword4" className="form-label">
                    Room Number
                  </label>
                  <input type="number" className="form-control" id="inputPassword4" name='room_number' defaultValue={user.room_number} />
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputState" className="form-label">
                    Type of Issue
                  </label>
                  <select id="inputState" className="form-select" name='issue_type' defaultValue={user.issue_type}>
                    <option>Choose...</option>
                    <option value={"Electricity"}>Electricity</option>
                    <option value={"Water Supply"}>Water Supply</option>
                    <option value={"Cleaniness and Hyegine"}>
                      Cleaniness and Hyegine
                    </option>
                    <option value={"Food and mess"}>Food and mess</option>
                    <option value={"Ragging /illegal Activities"}>
                      Ragging /illegal Activities
                    </option>
                    <option value={"Other"}>Other </option>
                  </select>
                  <br />
                  <TextArea user_state={user} />
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Submit Complaint
                  </button>
                </div>
              </form>
          </motion.div>
        </div>
      </div>
    </>
  )
}
export default ComplaintForm