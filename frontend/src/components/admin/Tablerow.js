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
        <td><button type="button" onClick={evt => {document.querySelector("#modal-content").innerHTML =  evt.target.parentElement.parentElement.querySelector(".d-none").textContent; document.querySelector("#complaint-id").innerHTML = props.cid }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          View Complaint
        </button>
        </td>
        <td className='d-none'>{props.problem}</td>
      </tr>

    </>
  )
}

export default Tablerow