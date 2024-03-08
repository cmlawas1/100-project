import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { 
  RouterProvider, 
  createBrowserRouter 
} from 'react-router-dom'
import HomeC from './pages/customer/HomeC'
import MyOrder from './pages/customer/MyOrder'
import HomeM from './pages/merchant/HomeM'
import Orders from './pages/merchant/Orders'
import Reports from './pages/merchant/Reports'
import Contacts from './pages/Contact'
import About from './pages/About'
import NoPage from './pages/NoPage'
import Register from './pages/Register'
import Login from './pages/Login'
// import Header from '.pages/Header'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/customer-home",
    element: <HomeC />,
  },
  {
    path: "/my-orders",
    element: <MyOrder />,
  },
  {
    path: "/merchant-home",
    element: <HomeM />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/*",
    element: <NoPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);