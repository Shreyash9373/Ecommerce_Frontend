import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import SigningPage from "./pages/SigningPage";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import { AuthContextProvider } from "./context/AuthContext";
import UserAccountLayout from "./pages/layouts/UserAccountLayout";
import MainLayout from "./pages/layouts/MainLayout";
import GeneralPage from "./pages/account/GeneralPage";
import PasswordPage from "./pages/account/PasswordPage";
import AddressPage from "./pages/account/AddressPage";
import OrderPage from "./pages/account/OrderPage";
import VendorRegistration from "./pages/Vendor/VendorRegistration";

const App = () => {
  return (
    // <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <div>
      <ToastContainer />
      <AuthContextProvider>
        <Routes>
          <Route path="/user/account" element={<UserAccountLayout />}>
            <Route index element={<Navigate to="general" />} />
            <Route path="general" element={<GeneralPage />} />
            <Route path="password" element={<PasswordPage />} />
            <Route path="address" element={<AddressPage />} />
            <Route path="orders" element={<OrderPage />} />
            
          </Route>
         
          {/* Main routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<SigningPage />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route path="/registration" element={<VendorRegistration />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
