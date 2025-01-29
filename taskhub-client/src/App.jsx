import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style/App.css";
import RegistrationPage from "./components/RegistrationPage";
import LogInPage from "./components/LogInPage";
import VerificationPage from "./components/VerificationPage";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/NavBar";
import Dashboard from "./components/DashBoard";

import UserDetails from "./components/UserDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-details" element={<UserDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
