import React from 'react'
import './Table.css'
import Tablerow from './Tablerow'
function Table() {

  return (
    <>

      <div className="container mt-4 table-responsive tables">
        <div className="container"></div>
        <div className='option row frb table-responsive'>
          <div className="individual-option col-3">
            <h4 className='optioname'>Sort by</h4>
            <select name="" className="optsel" >
              <option value="">Name</option>
              <option selected value="">Complaint ID</option>
              <option value="">Date</option>
              <option value="">Roll Number</option>
            </select>
          </div>
          <div className="individual-option col-3">
            <h4 className='optioname'>Hostel Location</h4>
            <select name="" className="optsel" id="">
              <option selected value="">Hostel No 1</option>
              <option value="">Hostel No 2</option>
              <option value="">Hostel No 3</option>
            </select>
          </div>
          <div className="individual-option col-3">
            <h4 className='optioname'>Problem Type</h4>
            <select name="" className="optsel" id="">
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
          </div>




        </div>
        <div className="sl row">
          <div className="sec-opt-bar container col">
            <input type="text" class="form-control searchbar" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
            <button class="btn btn-outline-secondary searchbutton" type="button" id="button-addon2"><i class="fa-solid fa-magnifying-glass"></i></button>

          </div>

        </div>
        <table class="table main-table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Date Received</th>
              <th scope="col">Complaint ID</th>
              <th scope="col">Name</th>
              <th scope="col">Roll No</th>
              <th scope='col'>Complaint Type</th>
              <th scope='col'>Complaint</th>

            </tr>
          </thead>
          <tbody>

            <Tablerow date="4-5-2022" cid="45" name="Ritesh Khandekar" rollno="4" top="Water " />
            <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Water " />
            <Tablerow date="4-5-2022" cid="45" name="Ritesh Khandekar" rollno="4" top="Water " />
            <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Food " />
            <Tablerow date="4-5-2022" cid="45" name="Ritesh Khandekar" rollno="4" top="Water " />
            <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Water " />
            <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Food " />
            <Tablerow date="4-5-2022" cid="45" name="Ritesh Khandekar" rollno="4" top="Water " />
            <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Water " />


          </tbody>
        </table>
      </div>
    </>
  )
}

export default Table