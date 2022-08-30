import "./App.css";
import React from 'react';
import Login from "./components/login/Login";
import AdminLogin from './components/login/AdminLogin'
import { Route, Routes } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Student from "./components/students/Student";
import ComplaintForm from "./components/students/Complaintform";
import Logout from "./components/login/Logout";
import TrackComplaint from "./components/students/TrackComplaint";
import MainPage from "./components/MainPage";
import ChangePwd from "./components/students/ChangePwd";

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
      <Route index element={<MainPage/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/admin/login' element={<AdminLogin />} />

        <Route path='/dashboard/admin' element={<Admin />} />
        <Route path='/dashboard/student' element={<Student />} />

        <Route path='/student/track' element={<TrackComplaint />} />
        <Route path='/student/complaint' element={<ComplaintForm />} />
        <Route path='/student/changepwd' element={<ChangePwd />} />

        <Route path='/logout' element={<Logout />} />

      </Routes>
    </>
  );
}

export default App;
