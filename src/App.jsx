import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "sonner";
import PrivateRoute from "./components/PrivateRoute";
import Loader from "./components/Loader";
import DashboardLayout from "./views/admin/DashboardLayout";
import { setCredentials } from "./features/auth/authSlice";

// Lazy-loaded components
const SignUp = lazy(() => import("./views/auth/SignUp"));
const SignIn = lazy(() => import("./views/auth/SignIn"));
const Home = lazy(() => import("./views/home/Home"));
const ProductList = lazy(() => import("./views/product-management/ProductList"));
const CustomerList = lazy(() => import("./views/customer-management/CustomerList"));
const AddProduct = lazy(() => import("./views/product-management/AddProduct"));
const EditProduct = lazy(() => import("./views/product-management/EditProduct"));
const NewCustomer = lazy(() => import("./views/customer-management/CustomerNew/index"));
const EditCustomer = lazy(() => import("./views/customer-management/CustomerEdit/index"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      dispatch(setCredentials({ user, token }));
    }
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" richColors />

      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />

            {/* Private */}
            <Route
              element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/productlist" element={<ProductList />} />
              <Route path="/customerlist" element={<CustomerList />} />

              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />

              {/* NEW — Edit Customer */}
              <Route path="/add-customer" element={<NewCustomer />} />
              <Route path="/edit-customer/:id" element={<EditCustomer />} />
            </Route>

            <Route path="*" element={<SignIn />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
