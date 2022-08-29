import React, { useEffect } from 'react'
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getData, postData } from '../methods/methods'
import TextArea from './TextArea'

function ComplaintForm() {
  const [res_json,updateRes] = useState({})
  const navigate = useNavigate()
  useEffect(()=>{getData("students")
    .then(data => {
      if (!data.login) {
        navigate('/login')
      } else {
        updateRes(data)
      }
    });},[])

  const [user] = useState(res_json);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null)
  const form = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    var formdata = new FormData(form.current);
    postData("complaints",formdata)
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
      <div className="containers">
        <h1 id="formtitle">Student Complaint</h1>
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
      </div>
    </>
  )
}
export default ComplaintForm