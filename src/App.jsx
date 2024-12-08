import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from "./contexts/ThemeContext"; // Assuming you already have ThemeContext
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Timelogs from "./pages/Timelogs";
import Users from "./pages/users/Users";
import ForApproval from "./pages/users/ForApproval";
import Admin from "./pages/users/Admin";
import RegularUsers from "./pages/users/Users";
import Inventory from "./pages/Inventory";
import EditProfile from "./pages/users/EditProfile";
import ProtectedRoutes from "./protectedRoutes/ProtectedRoutes";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import "./styles/App.css";

function MaintenancePage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Maintenance Mode</h1>
      <p>The website is currently under maintenance. Please check back later.</p>
    </div>
  );
}

function HeaderRouteCheck() {
  const location = useLocation();
  if (location.pathname === "/" || location.pathname === "/signup") {
    return null;
  }
  return <Header />;
}

function App() {
  const [theme, setTheme] = useState("light"); // Default theme is light
  const [isFetchingTheme, setIsFetchingTheme] = useState(true); // Track fetching state
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await axios.get("http://54.252.176.21:3030/settings"); // Replace with your backend URL
        if (response.data && response.data.theme) {
          setTheme(response.data.theme);
          setIsMaintenanceMode(response.data.maintenanceMode);
        } else {
          console.error("Theme data is missing in the response.");
        }
      } catch (error) {
        console.error("Error fetching theme from the database:", error);
      } finally {
        setIsFetchingTheme(false); // Mark fetching as complete
      }
    };

    const fetchUserRole = async () => {
      try {
        // Retrieve user data from localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user); // Optional: to check if the user is correctly retrieved from localStorage
        setUserRole(user.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchTheme();
    fetchUserRole();
  }, []);

  useEffect(() => {
    document.body.className = theme; // Apply theme to the body class
  }, [theme]);

  if (isFetchingTheme) {
    return <div>Loading...</div>; // Show a loader while fetching the theme
  }

  console.log("Maintenance Mode: ", isMaintenanceMode);
  console.log("Role: ", userRole);
  console.log("Current Path: ", location.pathname);

  // If maintenance mode is enabled and the user is not an admin or superadmin, show the MaintenancePage
  if (isMaintenanceMode && userRole !== "SUPERADMIN" && userRole !== "ADMIN" && !isLoginPage) {
    return <MaintenancePage />;
  }

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <div className="App">
        <HeaderRouteCheck />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes allowedRoles={["SUPERADMIN", "ADMIN", "USER"]}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/timelogs"
            element={
              <ProtectedRoutes allowedRoles={["SUPERADMIN", "ADMIN", "USER"]}>
                <Timelogs />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoutes allowedRoles={["SUPERADMIN", "ADMIN"]}>
                <Users />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes allowedRoles={["SUPERADMIN", "ADMIN"]}>
                <Admin />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/regular-users"
            element={
              <ProtectedRoutes allowedRoles={["SUPERADMIN", "ADMIN"]}>
                <RegularUsers />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/for-approval"
            element={
              <ProtectedRoutes allowedRoles={["SUPERADMIN", "ADMIN"]}>
                <ForApproval />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoutes allowedRoles={["SUPERADMIN", "USER", "ADMIN"]}>
                <Inventory />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/editprofile"
            element={
              <ProtectedRoutes allowedRoles={["SUPERADMIN", "USER", "ADMIN"]}>
                <EditProfile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoutes allowedRoles={["SUPERADMIN", "USER", "ADMIN"]}>
                <Notifications />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoutes allowedRoles={["SUPERADMIN"]}>
                <Settings />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
