import React from 'react'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/custom.scss";
import App from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query';
import { getQueryClient } from './services/queryClient.tsx';

const queryClient = getQueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
