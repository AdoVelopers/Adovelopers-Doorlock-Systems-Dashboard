import React from "react";
import ReactDOM from "react-dom/client"; // React 18 uses createRoot
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App";
import './index.css';
import { UserProvider } from "./protectedRoutes/UserContext"; // Ensure this path is correct

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter> {/* Wrap the App with BrowserRouter */}
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
