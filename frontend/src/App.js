import "./App.css";
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Table from "./components/Table";
import NavbarLight from "./components/navbar/NavbarAdminLight";
import ComplaintForm from "./components/Complaintform";

// import ComplaintForm from "./components/Complaintform";

function App() {
  return (
    <>
    <NavbarLight />
    <Routes>
      <Route path='/admin' element={<Table />} />
      <Route path='/complaint' element={<ComplaintForm/>} />

    </Routes>
    </>
  );
}

export default App;
