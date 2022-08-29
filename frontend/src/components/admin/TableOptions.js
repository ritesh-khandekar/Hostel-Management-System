import React from 'react'
import './Table.css'
import logo from './crce-logo.svg'
function TableOptions(props) {
  return (
    <>
      <div className="container tab-opt">
        <div className="statsblock row">
          <div className="stblock col-4">
            <h3>TOTAL COMPLAINTS</h3>
            <h1 id='tno'>{props.total}</h1>
          </div>
          <div className="stblock col-4 ">
            <h3>TOTAL COMPLAINTS</h3>
            <h1 id='pno'>{props.pending}</h1>
          </div>
          <div className="stblock col-4">
            <h3>TOTAL COMPLAINTS</h3>
            <h1 id='sno'>{props.solved}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default TableOptions