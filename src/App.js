import './App.css';
import Products from './Component/Products/Products.jsx';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './Component/Home/Home.jsx';
import MasterLayout from './Component/MasterLayout/MasterLayout.jsx';
import Categories from './Component/Categories/Categories';
import Brands from './Component/Brands/Brands.jsx';
import ProductDetails from './Component/ProductDetails/ProductDetails.jsx';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import NotFound from './Component/NotFound/NotFound.jsx';
import { ToastContainer } from 'react-toastify';

import { useContext, useEffect } from 'react';
import { AuthContext } from './Context/AuthContext.js';
import { InverseProtectedRouter, ProtectedRouter } from './Component/ProtectedRouter/ProtectedRouter.js';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import ResetCode from './Component/ResetCode/ResetCode.jsx';
import ResetPassword from './Component/ResetPassword/ResetPassword.jsx';
import CartItems from './Component/CartItems/CartItems.jsx';
import WishList from './Component/WishList/WishList';
import BrandDetails from './Component/BrandDetails/BrandDetails.jsx';
import CategoryDetails from './Component/CategoryDetails/CategoryDetails.jsx';
import Checkout from './Component/Checkout/Checkout.jsx';


function App() {

  let { SaveUserData } = useContext(AuthContext)



  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      SaveUserData();
    }

  }, [])


  let router = createHashRouter([
    {
      path: '/', element: <MasterLayout />, children: [
        { path: '/', element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'products', element: <Products /> },
        { path: 'categories', element: <Categories /> },
        { path: 'catdetails/:_id', element: <CategoryDetails /> },
        { path: 'brands', element: <Brands /> },
        { path: 'branddetails/:_id', element: <BrandDetails /> },
        { path: 'productdetails/:id', element: <ProductDetails /> },
        { path: 'checkout', element: <ProtectedRouter><Checkout /></ProtectedRouter> },
        { path: 'cartItems', element: <ProtectedRouter><CartItems /></ProtectedRouter> },
        { path: 'wishList', element: <ProtectedRouter><WishList /></ProtectedRouter> },
        { path: 'register', element: <InverseProtectedRouter><Register /></InverseProtectedRouter> },
        { path: 'login', element: <InverseProtectedRouter><Login /></InverseProtectedRouter> },
        { path: 'forgetPassword', element: <InverseProtectedRouter><ForgetPassword /></InverseProtectedRouter> },
        { path: 'resetCode', element: <InverseProtectedRouter><ResetCode /></InverseProtectedRouter> },
        { path: 'resetPassword', element: <InverseProtectedRouter><ResetPassword /></InverseProtectedRouter> },
        { path: '*', element: <NotFound /> },



      ]
    }
  ])

  return (
    <>


      <ToastContainer theme='colored' />
      <RouterProvider router={router} />



    </>
  );
}

export default App;
