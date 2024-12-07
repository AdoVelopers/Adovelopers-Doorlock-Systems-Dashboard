import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import { ThemeProvider } from './contexts/ThemeContext'; // Assuming you already have ThemeContext
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
import './styles/App.css';

// New MaintenancePage component
function MaintenancePage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
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
  return (
    <Header />
  )
}

function App() {
  const [theme, setTheme] = useState('light'); // Default theme is light
  const [isFetchingTheme, setIsFetchingTheme] = useState(true); // Track fetching state
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false); // Track maintenance mode
  const [userRole, setUserRole] = useState(null); // Track the user's role (e.g., admin, superadmin, user)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://54.252.176.21:3030/settings'); // Replace with your backend URL
        if (response.data) {
          setTheme(response.data.theme);
          setIsMaintenanceMode(response.data.maintenanceMode); // Assuming you store maintenanceMode in the settings
        } else {
          console.error("Settings data is missing in the response.");
        }
      } catch (error) {
        console.error("Error fetching settings from the database:", error);
      } finally {
        setIsFetchingTheme(false); // Mark fetching as complete
      }
    };

    const fetchUserRole = async () => {
      try {
        // Assuming you store user data in local storage after login
        const user = JSON.parse(localStorage.getItem('user')); // Adjust this according to your authentication method
        if (user && user.role) {
          setUserRole(user.role); // Set user role (admin, superadmin, user, etc.)
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchSettings();
    fetchUserRole();
  }, []);

  useEffect(() => {
    // Apply the theme to the body class
    document.body.className = theme;
  }, [theme]);

  if (isFetchingTheme) {
    return <div>Loading...</div>; // Show a loader while fetching the theme
  }

  // Ensure the login page is always available, even during maintenance mode
  const isLoginPage = window.location.pathname === "/" || window.location.pathname === "/signup";

  // If maintenance mode is enabled and the user is not admin/superadmin, show MaintenancePage
  if (isMaintenanceMode && userRole !== 'superadmin' && userRole !== 'admin' && !isLoginPage) {
    return <MaintenancePage />;
  }

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <Router>
        <div className="App">
          <HeaderRouteCheck />
          <Routes>
            {/* Always show Login page regardless of maintenance mode */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected routes, only shown if not in maintenance mode or if user is admin/superadmin */}
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
              path="/notifications"
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
              path="/for-approval"
              element={
                <ProtectedRoutes allowedRoles={["superadmin"]}>
                  <ForApproval />
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
            <Route
              path="/settings"
              element={
                <ProtectedRoutes allowedRoles={["superadmin"]}>
                  <Settings />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
