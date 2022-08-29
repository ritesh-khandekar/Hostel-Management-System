import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { postData, getData } from '../methods/methods';
import TableOptions from './TableOptions';
import './Table.css'
import Tablerow from './Tablerow'
function Table() {

  const form = useRef(null);
  const [incomingData, changeData] = useState([]);
  const [admin_level,setLevel] = useState(1);
  const [solved, setSolved] = useState(0);
  const navigate = useNavigate();
  var new_data = {
    filters: {

    },
    sort: {
      name: "roll_number",
      order: ""
    }
  };
  const [data] = useState({
    filters: {

    },
    sort: {
      name: "",
      order: ""
    }
  });
  // function updateSearch() {
  //   var val = e.target.value;
  //   var name = val.match(/^[0-9]+$/) ? "complaint_id" : "name";
  //   add_data["name"] = name;
  //   add_data["val"] = val;
  // }
  useEffect(() => {
    getData("admin").then(data => {
      if(data["login"]){
        setLevel(parseInt(data["ADMIN_LEVEL"]))
        setSolved(parseInt(data["solved"]))
      }
    })
    getData("admin/complaints").then(data => {
      if (data.hasOwnProperty("login")) {
        navigate('/admin/login')
      } else {
        changeData(data);
      }
    })
  }, [])

  function handleFiltersSubmit() {
    var formdata = new FormData(form.current);


    for (const [key, val] of formdata) {
      if (key == "sortBy") {
        new_data.sort.name = val;
      }
      else if (key == "searchFilter") {
        if (val.match(/^\d+$/)) {
          new_data.filters["complaint_id"] = val;
        } else {
          new_data.filters["name"] = val;
        }
      } else {
        new_data.filters[key] = val;
      }
    }
    // new_data.filters[add_data["nasme"]] = add_data["val"];
    console.log(new_data)
    postData("admin/complaints", formdata).then(data => {
      
      if (typeof data !== "undefined")
        changeData(data);
    })
  }
  function handleAccept(cid) {
    postData("admin/complaints/modify", {
      complaint_id: cid,
      complaint_status: "ACCEPT"
    }).then(data => {
      if (typeof data !== "undefined")
        if (data["success"]) {
          alert(cid + " : " + "ACCEPT")
        }
    })
  }
  function handleEscalate(cid) {
    postData("admin/complaints/modify", {
      complaint_id: cid,
      complaint_status: "ESCALATE"
    }).then(data => {
      if (typeof data !== "undefined")
        if (data["success"]) {
          alert(cid + " : " + "ESCALATE")
        }
    })
  }
  function handleReject(cid) {
    postData("admin/complaints/modify", {
      complaint_id: cid,
      complaint_status: "REJECT"
    }).then(data => {
      if (typeof data !== "undefined")
        if (data["success"]) {
          alert(cid + " : " + "REJECT")
        }
    })
  }
  return (
    <>
      <TableOptions total={incomingData.length} pending={solved} solved={incomingData.filter((val) => val.status != "").length} />
      <div className="container pt-4 table-responsive tables">
        <div className='option row frb table-responsive'>
          <form onChange={handleFiltersSubmit} ref={form}>
            <div className="individual-option col-3">
              <h4 className='optioname'>Sort by</h4>
              <select name="sortBy" className="optsel" defaultValue={data.sort.name} >
                <option value="roll_number">Roll Number</option>
                <option value="name">Name</option>
                <option value="complaint_id">Complaint ID</option>
                <option value="createdAt">Date</option>
              </select>
            </div>
            <div className="individual-option col-3">
              <h4 className='optioname'>Hostel Location</h4>
              <select name="hostel_number" className="optsel" id="" defaultValue={data.filters.hostel_number}>
                <option value="1">Hostel No 1</option>
                <option value="2">Hostel No 2</option>
                <option value="3">Hostel No 3</option>
              </select>
            </div>
            <div className="individual-option col-3">
              <h4 className='optioname'>Problem Type</h4>
              <select name="problem" className="optsel" id="" defaultValue={data.filters.issue_type}>
                <option value={""}>All </option>
                <option value={"Electricity"}>Electricity</option>
                <option value={"Water Supply"}>Water Supply</option>
                <option value={"Cleanliness and Hyegine"}>
                  Cleanliness and Hyegine
                </option>
                <option value={"Food and mess"}>Food and mess</option>
                <option value={"Ragging /illegal Activities"}>
                  Ragging /illegal Activities
                </option>
              </select>
            </div>
            <div className="sl row">
              <div className="sec-opt-bar container col">
                <input type="text" name='searchFilter' className="form-control searchbar" placeholder="Search by name or Complaint ID" aria-label="Search" aria-describedby="button-addon2" />
              </div>
            </div>
          </form>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Complaint:</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Complaint: <p id='modal-content'></p>
                Complaint ID: <b><p id='complaint-id'></p></b> 
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-success" onClick={evt => handleAccept(evt.target.parentElement.parentElement.querySelector("#complaint-id").textContent)}>ACCEPT</button>
                <button type="button" className="btn btn-danger" onClick={evt => handleReject(evt.target.parentElement.parentElement.querySelector("#complaint-id").textContent)}>REJECT</button>
                {admin_level == 3 ? "" : <button type="button" className="btn btn-primary" onClick={evt => handleEscalate(evt.target.parentElement.parentElement.querySelector("#complaint-id").textContent)}>ESCALATE</button> }
              </div>
            </div>
          </div>
        </div>

        <table className="table main-table table-striped table-hover">
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
            {incomingData.map((json, i) => {
              return <Tablerow key={i} date={json.createdAt} cid={json.id} name={json.name} rollno={json.roll_number} top={json.issue_type} problem={json.problem} />
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
// <Tablerow date="4-5-2022" cid="45" name="Ritesh Khandekar" rollno="4" top="Water " />
// <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Water " />
// <Tablerow date="4-5-2022" cid="45" name="Ritesh Khandekar" rollno="4" top="Water " />
// <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Food " />
// <Tablerow date="4-5-2022" cid="45" name="Ritesh Khandekar" rollno="4" top="Water " />
// <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Water " />
// <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Food " />
// <Tablerow date="4-5-2022" cid="45" name="Ritesh Khandekar" rollno="4" top="Water " />
// <Tablerow date="8-5-2022" cid="41" name="Hitesh Khandekar" rollno="4" top="Water " />

export default Table