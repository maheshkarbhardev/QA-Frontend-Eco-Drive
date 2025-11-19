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
const AddProduct= lazy(()=> import("./views/product-management/AddProduct"));
const EditProduct=lazy(()=> import("./views/product-management/EditProduct"));
const NewCustomer=lazy(()=> import("./views/customer-management/CustomerNew/index"))

function App() {
  const dispatch = useDispatch();

  //  Rehydrate Redux store with localStorage data on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")); //JSON.parse(localStorage.getItem("user")) converts the stored JSON string back to an object (or returns null if not present).
    if (token && user) {
      dispatch(setCredentials({ user, token }));
    }
  }, [dispatch]);  //The dependency array [dispatch] ensures the effect runs only when the component mounts (and the dispatch ref changes, which it won’t).

  return (
    <>
      {/*  Global Toaster for app-wide notifications */}
      <Toaster position="top-right" richColors />

      <BrowserRouter>
        {/* Suspense provides fallback loader while components load */}
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />

            {/*  Protected Routes (require login) */}
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
              <Route path="/add-product" element={<AddProduct/>}/>
              <Route path="/edit-product/:id" element={<EditProduct/>}/>

              <Route path="/add-customer" element={<NewCustomer/>}/>
            </Route>

            {/*  Catch-all route (redirect to login) */}
            <Route path="*" element={<SignIn />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
