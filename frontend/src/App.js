import "./App.css";
import React from 'react';

import Table from "./components/Table";
import TableOptions from "./components/TableOptions";

// import ComplaintForm from "./components/Complaintform";

function App() {
  return (
    <>
    <TableOptions total="4" pending="2" solved="2"/>
 <Table/>
    </>
  );
}

export default App;
