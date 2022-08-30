import React from 'react'
// import './Table.css'
function Tablerow(props) {
  return (
    <>
      <tr>
        <td scope="row">{props.date}</td>
        <td>{props.cid}</td>
        <td>{props.name}</td>
        <td>{props.rollno}</td>
        <td>{props.top}</td>
        <td>{(props.status == "ACCEPT" ? <p className="alert alert-success m-0 px-2 p-0">{props.status}</p>:<p className="alert alert-warning m-0 px-2 p-0">{props.status}</p>)}</td>
        <td><button type="button" onClick={evt => { document.querySelector("#modal-content").innerHTML = evt.target.parentElement.parentElement.querySelector(".d-none").textContent; document.querySelector("#complaint-id").innerHTML = props.cid; evt.target.parentElement.parentElement.remove() }} className={props.status!= null ? (props.status.length < 1 ? "btn btn-primary":"btn btn-outline-primary"):"btn btn-primary"} data-bs-toggle="modal" data-backdrop="static" data-keyboard="false" data-bs-target="#exampleModal">
        View Complaint
        </button>
        </td>
        <td className='d-none'>{props.problem}</td>
      </tr>

    </>
  )
}

export default Tablerow