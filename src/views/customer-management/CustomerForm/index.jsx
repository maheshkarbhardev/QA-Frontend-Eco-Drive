import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Loader from "@/components/Loader";
import cloneDeep from "lodash/cloneDeep";
import { setInitialCurrentPosition } from "../../../features/customerManagement/customerSlice";

import CustomerInformationFields from "../components/CustomerInformationFields";
import CustomerContactPerson from "../components/CustomerContactPerson";
import CustomerImages from "../components/CustomerImages";
import CustomerBillingAddress from "../components/CustomerBillingAddress";
import CustomerShippingAddress from "../components/CustomerShippingAddress";
// import Location from "../components/Location";
import LeafletLocation from "../components/LeafletLocation";
import Status from "../components/Status";
import { AiOutlineSave } from "react-icons/ai";

// -----------------------------------------------------
// DEFAULT FORM VALUES
// -----------------------------------------------------
const initialValues = {
  name: "",
  mobile: "",
  email: "",
  gstimg: null,
  gstno: "",
  relationship_manager: "",
  payment_term: "",

  billing_state: null,
  billing_district: null,
  billing_taluka: null,
  billing_city_id: null,

  billing_address: "",
  billing_pincode: "",
  billing_latitude: "",
  billing_longitude: "",
  billing_google_address: "",

  shipping: {
    state: null,
    city: null,
    district: null,
    taluka: null,
    address: "",
    pincode: "",
  },
  
  isRegisteredGSTIN: "",
  shipping_latitude: "",
  shipping_longitude: "",
  shipping_google_address: "",

  cp1_name: "",
  cp1_email: "",
  cp1_mobile: "",
  cp1_designation: "",

  cp2_name: "",
  cp2_email: "",
  cp2_mobile: "",
  cp2_designation: "",

  google_address: "",
  shipping_same_as_billing: false,
  status: { label: "Active", value: 1 },
};

// -----------------------------------------------------
// VALIDATION
// -----------------------------------------------------
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Customer name is required"),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("Mobile number is required")
    .min(10, "Min 10 digits")
    .max(10, "Max 10 digits"),
  email: Yup.string().email().required("Email is required"),
  relationship_manager: Yup.string().required("Relationship Manager is required"),

  gstno: Yup.string().nullable(),

  payment_term: Yup.number().required("Payment term is required"),

  billing_state: Yup.object().required("State is required"),
  billing_district: Yup.object().required("District is required"),
  billing_taluka: Yup.object().required("Taluka is required"),
  billing_city_id: Yup.object().required("City is required"),
  billing_address: Yup.string().required("Address is required"),
  billing_pincode: Yup.number().required("Pincode is required"),
  billing_latitude: Yup.string().required("Latitude is required"),
  billing_longitude: Yup.string().required("Longitude is required"),
  billing_google_address: Yup.string().required("Google Address is required"),

  isRegisteredGSTIN: Yup.object().required("GST Registered field is required"),

  status: Yup.object().required("Status is required"),
});

const CustomerForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { type, onFormSubmit, onDiscard } = props;
  const { loading } = useSelector((state) => state.customer);

  return (
    <div>
      <div className="w-full h-full bg-[#eaeaea] pb-[20px] pt-[20px] rounded-xl">
        <span className="text-[25px] font-semibold pl-[30px]">Add Customer</span>

        {loading ? (
          <Loader />
        ) : (
          <div className="mr-[20px] ml-[20px] bg-white rounded-2xl mt-[20px]">
            <Formik
              innerRef={ref}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                const formData = cloneDeep(values);
                onFormSubmit?.(formData, setSubmitting);
                dispatch(setInitialCurrentPosition());
              }}
            >
              {({
                values,
                touched,
                errors,
                isSubmitting,
                setFieldValue,
                handleChange,
              }) => (
                <Form>
                  <div className="flex flex-row gap-6 px-6 py-6">
                    <div className="flex flex-col w-2/3 space-y-6">
                      <CustomerInformationFields
                        touched={touched}
                        values={values}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                      />

                      <CustomerContactPerson
                        touched={touched}
                        values={values}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                      />

                      <CustomerBillingAddress
                        touched={touched}
                        values={values}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                      />

                      <CustomerShippingAddress
                        touched={touched}
                        values={values}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                      />

                      {/* <Location
                        values={values}
                        touched={touched}
                        errors={errors}
                        setFieldValue={setFieldValue}
                      /> */}

                      {/* leaflet Map */}
                      <LeafletLocation
                          values={values}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />

                      <Status
                        values={values}
                        touched={touched}
                        errors={errors}
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className="flex flex-col w-1/3">
                      <CustomerImages
                        touched={touched}
                        values={values}
                        errors={errors}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-row gap-4 ml-[40px] pb-[20px]">
                    {/* DISCARD BUTTON */}
                    <Button
                      asChild
                      className="bg-white text-black border-2 hover:bg-white cursor-pointer"
                    >
                      <button type="button" onClick={onDiscard}>
                        Discard
                      </button>
                    </Button>

                    {/* SUBMIT BUTTON */}
                    <Button
                      asChild
                      className="bg-green-500 border-2 border-gray-300 text-white hover:bg-green-500 cursor-pointer"
                    >
                      <button type="submit" disabled={isSubmitting}>
                        <AiOutlineSave className="text-white inline-block mr-1" />
                        Save
                      </button>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
});

export default CustomerForm;
