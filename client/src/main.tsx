import React from 'react'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/custom.scss";
import App from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from './services/queryClient.tsx';
import { AuthProvider } from 'react-oidc-context';
import { AuthRequired } from './AuthRequired.tsx';
import { WebStorageStateStore } from 'oidc-client-ts';

const queryClient = getQueryClient();

const oidcConfig = {
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  // authority: "https://bridgerkc.duckdns.org:8641/realms/dev",
  authority: "https://100.68.122.57:8641/realms/dev",
  client_id: "choreChamps",
  redirect_uri: "http://localhost:8080/", // window.location?
  response_type: 'code',
  scope: "openid profile email",
  loadUserInfo: true,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* <AuthRequired> */}
          <App />
          {/* </AuthRequired> */}
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
