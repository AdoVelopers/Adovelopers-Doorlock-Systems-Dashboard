import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Timelogs from "./pages/Timelogs";
import Users from "././pages/users/Users";
import Admin from "././pages/users/Admin";
import RegularUsers from "././pages/users/Users";
import Inventory from "././pages/Inventory";

function HeaderRouteCheck() {
  const location = useLocation();
  if (location.pathname === "/" || location.pathname === "/signup") {
    return null;
  }
  return <Header />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderRouteCheck />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/timelogs" element={<Timelogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/regular-users" element={<RegularUsers />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
