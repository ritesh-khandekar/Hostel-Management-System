import React from 'react'

function TableOptions(props) {
  return (
    <>
      <div className="container">
        <div className="row p-3 justify-content-around">
          <div className="col-3 shadow-sm rounded-3">
            <h5>TOTAL COMPLAINTS</h5>
            <h1 id='tno' className='text-warning'>{props.total}</h1>
          </div>
          <div className="col-3 shadow-sm rounded-3 ">
            <h5>SOLVED COMPLAINTS</h5>
            <h1 id='pno' className='text-success'>{props.solved}</h1>
          </div>
          <div className="col-3 shadow-sm rounded-3">
            <h5>PENDING COMPLAINTS</h5>
            <h1 id='sno' className='text-danger'>{props.pending}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default TableOptions