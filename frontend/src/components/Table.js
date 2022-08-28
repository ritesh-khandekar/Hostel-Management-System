import React from 'react'
import './Table.css'
import Tablerow from './Tablerow'
function Table() {
    
      
  return (
   <>
     
 <div className="container mt-4 table-responsive tables">
    <div className='option'>
        <h4 className='optioname'>SORT BY</h4>
        <select name="" className="optsel" >
            <option value="">NAME</option>
            <option selected value="">COMPLAINT ID</option>
            <option value="">DATE</option>
            <option value="">ROLL NUMBER</option>
        </select>
        <h4 className='optioname'>HOSTEL LOCATION</h4>
        <select name="" className="optsel" id="">
            <option selected value="">HOSTEL NO 1</option>
            <option  value="">HOSTEL NO 2</option>
            <option value="">HOSTEL NO 3</option>
        </select>
        <h4 className='optioname'>TYPE OF PROBLEM</h4>
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
        <div class="input-group mb-3">
  <input type="text" class="form-control searchbar" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
  <button class="btn btn-outline-secondary searchbar" type="button" id="button-addon2">Button</button>
</div>

    </div>
       <table class="table table-striped table-hover">
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
    <Tablerow date="4-5-2022" cid="45" name="Ritesh Khandekar" rollno="4" top="Water "/>
    <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Water "/>
    <Tablerow date="4-5-2022" cid="45" name="Ritesh Khandekar" rollno="4" top="Water "/>
    <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Food "/>
    <Tablerow date="4-5-2022" cid="45" name="Ritesh Khandekar" rollno="4" top="Water "/>
    <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Water "/>
  </tbody>
  </table>
 </div>
   </>
  )
}

export default Table