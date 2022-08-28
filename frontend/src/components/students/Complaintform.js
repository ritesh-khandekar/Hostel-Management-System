import React from 'react'
import TextArea from './TextArea'

function ComplaintForm() {
  
  return (
    <>
     <div className="containers">
        <h1 id="formtitle">Student Complaint</h1>
        <form className="row g-3">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputPassword4" className="form-label">
              Roll Number
            </label>
            <input type="number" className="form-control" id="rollno" />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputEmail4" className="form-label">
              Hostel Number
            </label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputPassword4" className="form-label">
              Room Number
            </label>
            <input type="number" className="form-control" id="inputPassword4" />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputState" className="form-label">
              Type of Issue
            </label>
            <select id="inputState" className="form-select">
              <option selected>Choose...</option>
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
            <TextArea />
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