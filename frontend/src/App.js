import "./App.css";
import React from 'react';
import Login from "./components/login/Login";
import AdminLogin from './components/login/AdminLogin'
import { Route, Routes } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Student from "./components/students/Student";
import ComplaintForm from "./components/students/Complaintform";
import Logout from "./components/login/Logout";

// import ComplaintForm from "./components/Complaintform";

// import { Route, Routes } from "react-router-dom";
// import Admin from "./components/admin/Admin";
// import Student from "./components/students/Student";
// import Table from "./components/admin/Table";
// import TableOptions from "./components/admin/TableOptions";


function App() {
  return (
    <>
      <Routes>
        <Route path='/admin' element={<Admin />} />
        <Route path='/' element={<Student />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/complaint' element={<ComplaintForm />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
