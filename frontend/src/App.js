import "./App.css";
import React from 'react';

import Table from "./components/Table";
import TableOptions from "./components/TableOptions";
import logo from './components/crce-logo.svg'
// import ComplaintForm from "./components/Complaintform";

function App() {
  return (
    <>
    <div className="icon">
  <img id="clg-logo" src={logo} alt="" />
</div>
    <TableOptions total="4" pending="2" solved="2"/>

 <Table/>
    </>
  );
}

export default App;
