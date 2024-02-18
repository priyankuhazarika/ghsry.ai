import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { FusionAuthProvider } from "@fusionauth/react-sdk";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FusionAuthProvider
      clientID="28e3d7bd-58df-4d95-9046-525866219ba3"
      serverUrl="http://localhost:9011"
      redirectUri="http://localhost:6080/fa-login-redirect"
    >
      <App />
    </FusionAuthProvider>
  </React.StrictMode>,
);
