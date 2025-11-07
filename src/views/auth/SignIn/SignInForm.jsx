import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../../features/auth/authSlice";
import { toast } from "sonner";

const initialValues = {
  userName: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Please Enter Your UserName"),
  password: Yup.string()
    .min(8, "At least 8 character")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "Atleast one lowercase letter")
    .matches(/[0-9]/, "Atleast one number")
    .required("Please Enter Your Password"),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    const result = await dispatch(signInUser(values));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Login Successful");
      resetForm();

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-[1038px] h-[737px] bg-[#a8dadc]">
      <div className="flex flex-col ml-[400px] mt-[90px]">
        <span className="text-[50px] font-bold mb-[20px] text-[#450920]">
          Sign In
        </span>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <Label htmlFor="userName" className="text-[18px] mb-[5px]">
                User Name
              </Label>

              <Input
                type="text"
                name="userName"
                value={values.userName}
                placeholder="User Name"
                onChange={handleChange}
                className="w-[400px] bg-white font-semibold"
              />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="userName" />
              </div>
              <br />

              <Label htmlFor="password" className="text-[18px] mb-[5px]">
                Password
              </Label>

              <Input
                type="password"
                name="password"
                value={values.password}
                placeholder="Password"
                onChange={handleChange}
                className="w-[400px] bg-white font-semibold"
              />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="password" />
              </div>
              <br />

              <Button
                variant="outline"
                type="submit"
                className="w-[400px] bg-[#03045e] text-white hover:bg-[#03045e] hover:text-white"
              >
                Sign In
              </Button>
              <br />

              <div className="text-gray-700 mt-[20px] ">
                Don't have an account yet?{" "}
                <a href="/signup" className="text-[#242322] font-bold">
                  Sign Up
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignInForm;
