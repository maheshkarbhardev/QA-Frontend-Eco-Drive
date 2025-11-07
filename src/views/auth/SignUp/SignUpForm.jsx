import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { signUpUser } from "../../../features/auth/authSlice";
import { toast } from "sonner";

//Defines default empty values for the form fields.Formik will use these as the initial state when the form loads.
const initialValues = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

//Creates a Yup schema — a set of validation rules for each form field.
const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Please Enter Your UserName"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Please Enter Your Email"),
  password: Yup.string()
    .min(8, "At least 8 character")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "Atleast one lowercase letter")
    .matches(/[0-9]/, "Atleast one number")
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Your passwords do not match"),
});

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ handleSubmit runs when the form is submitted
  const handleSubmit = async (values, { resetForm }) => {
    const result = await dispatch(signUpUser(values)); // Dispatch signup action

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Registration Successful 🎉");
      resetForm();

      // ✅ Add a short delay before navigation so the toast is visible
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      toast.error("Something went wrong ❌");
    }
  };

  // const handleSubmit = async (values, { resetForm }) => {
  //   //handleSubmit runs when the form is submitted.
  //   const result = await dispatch(signUpUser(values));//It dispatches the signUpUser Redux action with form values (userName, email, password, etc.).

  //   if (result.meta.requestStatus === "fulfilled") {
  //     toast.success("Registration Successful");
  //     resetForm();
  //      navigate("/"); // redirect after signup if needed
  //   } else {
  //     toast.error("Something went wrong");
  //   }
  // };

  return (
    <div className="bg-[#ecf39e] w-[1038px] h-[737px]">
      <div className="flex flex-col ml-[400px] mt-[90px]">
        <span className="text-[50px] font-medium mb-[20px]">Sign Up</span>
        {/*Wraps your entire form with Formik to automatically manage form state, validation, and submission. */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            // it gives you access to helpful props like: values: current form field values.handleChange: function to update field values when the user types.
            <Form>
              {/* Displays a label for the username input. */}
              <Label htmlFor="userName" className="text-[18px] text-[#5e503f] mb-[5px]">
                User Name
              </Label>

              {/* Input box for username — connected to Formik through name, value, and onChange. */}
              <Input
                type="text"
                name="userName"
                value={values.userName}
                placeholder="User Name"
                onChange={handleChange}
                className="w-[400px] bg-white font-semibold"
              />

              {/* Displays any validation error message for this field (e.g., "Please Enter Your UserName") in red. */}
              <div className="text-red-500 text-sm">
                <ErrorMessage name="userName" />
              </div>
              <br />

              <Label htmlFor="email" className="text-[18px] text-[#5e503f] mb-[5px]">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={values.email}
                placeholder="Email"
                onChange={handleChange}
                className="w-[400px] bg-white font-semibold"
              />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="email" />
              </div>
              <br />

              <Label htmlFor="password" className="text-[18px] text-[#5e503f] mb-[5px]">
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

              <Label htmlFor="confirmPassword" className="text-[18px] text-[#5e503f] mb-[5px]">
                Confirm Password
              </Label>
              <Input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
                className="w-[400px] bg-white font-semibold"
              />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="confirmPassword" />
              </div>
              <br />

              <Button
                variant="outline"
                type="submit"
                className="w-[400px] bg-[#03045e] text-white hover:bg-[#03045e] hover:text-white"
              >
                Sign Up
              </Button>
              <br />

              <div className="text-gray-700 mt-[20px] ">
                Already Have An Account ?{" "}
                <a href="/" className="text-[#242322] font-bold">
                  Sign In
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;