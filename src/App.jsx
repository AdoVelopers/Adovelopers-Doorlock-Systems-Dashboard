import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Timelogs from "./pages/Timelogs";
import Users from "./pages/users/Users";
import Admin from "./pages/users/Admin";
import RegularUsers from "./pages/users/Users";
import Inventory from "./pages/Inventory";
import EditProfile from "./pages/users/EditProfile";
import Notifications from "./pages/Notifications"; // Import Notifications
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import Notifications from "./pages/Notifications";

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
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes allowedRoles={["superadmin", "user"]}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/timelogs"
            element={
              <ProtectedRoutes allowedRoles={["superadmin", "user"]}>
                <Timelogs />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/Notifications"
            element={
              <ProtectedRoutes allowedRoles={["superadmin", "user"]}>
                <Notifications />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoutes allowedRoles={["superadmin"]}>
                <Users />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes allowedRoles={["superadmin"]}>
                <Admin />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/regular-users"
            element={
              <ProtectedRoutes allowedRoles={["superadmin", "user"]}>
                <RegularUsers />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoutes allowedRoles={["superadmin", "user"]}>
                <Inventory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/editprofile"
            element={
              <ProtectedRoutes allowedRoles={["superadmin", "user"]}>
                <EditProfile />
              </ProtectedRoutes>
            }
          />
          {/* Notifications Route */}
          <Route
            path="/notifications"
            element={
              <ProtectedRoutes allowedRoles={["superadmin", "user"]}>
                <Notifications />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
