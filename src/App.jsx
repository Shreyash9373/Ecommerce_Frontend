import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import SigningPage from "./pages/SigningPage";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import { AuthProvider } from "./context/AuthContext";
import UserAccountLayout from "./pages/layouts/UserAccountLayout";
import MainLayout from "./pages/layouts/MainLayout";
import GeneralPage from "./pages/account/GeneralPage";
import PasswordPage from "./pages/account/PasswordPage";
import AddressPage from "./pages/account/AddressPage";
import OrderPage from "./pages/account/OrderPage";
import VendorRegistration from "./pages/vendor/VendorRegistration";
import Checkout from "./pages/checkout";
import PickAddress from "./pages/PickAddress";
import PaymentPage from "./pages/PaymentPage";
import ConfirmOrderPage from "./pages/ConfirmOrderPage";
import UPIPaymentPage from "./pages/UPIPaymentPage";

const App = () => {
  return (
    // <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <div>
      <ToastContainer />
      <AuthProvider>
        <Routes>
          <Route path="/account" element={<UserAccountLayout />}>
            <Route index element={<Navigate to="general" />} />
            <Route path="general" element={<GeneralPage />} />
            <Route path="password" element={<PasswordPage />} />
            <Route path="address" element={<AddressPage />} />
            <Route path="orders" element={<OrderPage />} />
          </Route>

          {/* Main routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<SigningPage />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/pickAddress" element={<PickAddress />} />
            <Route path="/pickPayment" element={<PaymentPage />} />
            <Route path="/confirmOrder" element={<ConfirmOrderPage />} />
            <Route path="/order/upi-payment/:orderId" element={<UPIPaymentPage />} />
            <Route
              path="/order/success/:orderId"
              element={<div>Order Success Page (coming soon)</div>}
            />

            {/* Product routes */}
            <Route path="products">
              <Route index element={<Products />} />
              <Route path=":productId" element={<Product />} />
            </Route>
          </Route>

          <Route path="/registration" element={<VendorRegistration />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
