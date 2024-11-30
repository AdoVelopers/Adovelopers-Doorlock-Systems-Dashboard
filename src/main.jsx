import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserProvider } from "./protectedRoutes/UserContext"; 

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById("root")
);
