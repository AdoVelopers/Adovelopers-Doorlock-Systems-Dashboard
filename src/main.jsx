import React from "react";
import ReactDOM from "react-dom/client"; // Change here
import App from "./App";
import './index.css';
import { UserProvider } from "./protectedRoutes/UserContext"; 

const root = ReactDOM.createRoot(document.getElementById("root")); // Create root
root.render( // Use render with the root
  <UserProvider>
    <App />
  </UserProvider>
);
