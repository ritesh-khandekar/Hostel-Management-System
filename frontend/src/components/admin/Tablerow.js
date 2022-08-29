import React from 'react'
import './Table.css'
function Tablerow(props) {
  return (
   <>
      <tr>
        <td scope="row">{props.date}</td>
        <td>{props.cid}</td>
        <td>{props.name}</td>
        <td>{props.rollno}</td>
        <td>{props.top}</td>
        <td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          View Complaint
        </button>
        </td>
      </tr>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          </div>
        </div>
        </div>
      </>
      )
}

      export default Tablerow