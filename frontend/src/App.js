import "./App.css";
import React from 'react';
import { Route, Routes } from "react-router-dom";
import Admin from "./components/admin/Admin";
import Student from "./components/students/Student";

function App() {
  return (
    <>
      <Routes>
        <Route path='/admin' element={<Admin />} />
        <Route path='/' element={<Student />} />
      </Routes>
    </>
  );
}

export default App;
