import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from "react-router-dom";
import { Dashboard, Home, Login, Product, Category, Register, ForgetPassword, ChangePassword, Cart, Order } from './components/index.js';
import { NotFound, OtpVerification } from "./components/Utilities/index.js";
import { UserStorageProvider, OrderStorageProvider } from "./contexts/index.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' >
      <Route index element={<Navigate to='dashboard' />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='forget-password' element={<ForgetPassword />} />
      <Route path='change-password' element={<ChangePassword />} />
      <Route path='otp/:purpose' element={<OtpVerification />} />
      <Route path='dashboard' element={<Dashboard />}>
        <Route index element={<Navigate to='home' />} />
        <Route path='home' element={<Home />} />
        <Route path='product'>
          <Route index element={<Navigate to='../home' />} />
          <Route path=':id' element={<Product />} />
        </Route>
        <Route path='category'>
          <Route index element={<Navigate to='../home' />} />
          <Route path=':category' element={<Category />} />
        </Route>
        <Route path='order'>
          <Route index element={<Navigate to='../home' />} />
          <Route path=':id' element={<Order />} />
        </Route>
        <Route path='cart' element={<Cart />} />
        {/* <Route path='*' element={<NotFound />} /> */}
      </Route>
      {/* <Route path='*' element={<Navigate to='dashboard/notfound' />} /> */}
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserStorageProvider>
      <OrderStorageProvider>
        <RouterProvider router={router} />
      </OrderStorageProvider>
    </UserStorageProvider>
  </StrictMode>
)