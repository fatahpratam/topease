import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom";
import './index.css'
import { Dashboard, Home, Login, Register, Product } from './components/index.js';
import { StorageProvider } from "./contexts/StorageProvider.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' >
      <Route index element={<Navigate to='dashboard' />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='dashboard' element={<Dashboard />}>
        <Route index element={<Navigate to='home' />} />
        <Route path='home' element={<Home />} />
        <Route path='product'>
          <Route index element={<Navigate to='../home' />} />
          <Route path=':id' element={<Product />} />
        </Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StorageProvider>
      <RouterProvider router={router} />
    </StorageProvider>
  </StrictMode>
)