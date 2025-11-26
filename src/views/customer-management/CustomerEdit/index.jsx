import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerById,
  updateCustomer,
} from "../../../features/customerManagement/customerEditSlice";
import CustomerForm from "../CustomerForm";
import Loader from "@/components/Loader";
import { toast } from "sonner";

const CustomerEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const { loading, customerData } = useSelector(
    (state) => state.customerEdit
  );

  // -----------------------------
  // FETCH CUSTOMER ON PAGE LOAD
  // -----------------------------
  useEffect(() => {
    dispatch(getCustomerById(id));
  }, [id]);

  // -----------------------------
  // SET FORM VALUES WHEN DATA ARRIVES
  // -----------------------------
  useEffect(() => {
    if (customerData && formRef.current?.setValues) {
      const mapped = mapCustomerToForm(customerData);
      formRef.current.setValues(mapped);
    }
  }, [customerData]);

  // -----------------------------
  // MAP BACKEND → FORM STRUCTURE
  // -----------------------------
  const mapCustomerToForm = (data) => {
    const { customer, billing, shipping, cp1, cp2 } = data;

    return {
      /** BASIC */
      name: customer.name || "",
      mobile: customer.mobile || "",
      email: customer.email || "",

      /** GST */
      gstno: customer.gstin || "",
      gstimg: [],
      gst_images: customer.gst_images || [],
      gstin_img: customer.gst_images?.length ? customer.gst_images : null,

      /** RELATIONSHIP MANAGER */
      relationship_manager: customer.relationship_manager_id
        ? String(customer.relationship_manager_id)
        : "",

      payment_term: customer.payment_term || "",

      /** BILLING */
      billing_state: billing.state_id
        ? { value: billing.state_id, label: billing.state_name }
        : null,

      billing_district: billing.district_id
        ? { value: billing.district_id, label: billing.district_name }
        : null,

      billing_taluka: billing.taluka_id
        ? { value: billing.taluka_id, label: billing.taluka_name }
        : null,

      billing_city_id: billing.city_id
        ? { value: billing.city_id, label: billing.city_name }
        : null,

      billing_address: billing.address || "",
      billing_pincode: billing.pincode || "",
      billing_latitude: billing.latitude || "",
      billing_longitude: billing.longitude || "",
      billing_google_address: billing.google_address || "",

      /** SHIPPING */
      shipping_same_as_billing: false,

      shipping: {
        state: shipping.state_id
          ? { value: shipping.state_id, label: shipping.state_name }
          : null,

        district: shipping.district_id
          ? { value: shipping.district_id, label: shipping.district_name }
          : null,

        taluka: shipping.taluka_id
          ? { value: shipping.taluka_id, label: shipping.taluka_name }
          : null,

        city: shipping.city_id
          ? { value: shipping.city_id, label: shipping.city_name }
          : null,

        address: shipping.address || "",
        pincode: shipping.pincode || "",
      },

      /** FIXED – NOW STORED IN CORRECT FORM FIELDS */
      shipping_latitude: shipping.latitude || "",
      shipping_longitude: shipping.longitude || "",
      shipping_google_address: shipping.google_address || "",

      /** CONTACT PERSON 1 */
      cp1_name: cp1.name || "",
      cp1_email: cp1.email || "",
      cp1_mobile: cp1.mobile || "",
      cp1_designation: cp1.designation || "",

      /** CONTACT PERSON 2 */
      cp2_name: cp2.name || "",
      cp2_email: cp2.email || "",
      cp2_mobile: cp2.mobile || "",
      cp2_designation: cp2.designation || "",

      /** STATUS */
      status:
        customer.status === 1
          ? { label: "Active", value: 1 }
          : { label: "Inactive", value: 0 },

      isRegisteredGSTIN:
        customer.isRegisteredGSTIN === 1
          ? { label: "Yes", value: 1 }
          : { label: "No", value: 0 },
    };
  };

  // -----------------------------
  // SUBMIT HANDLER (FIXED VERSION)
  // -----------------------------
  const handleSubmit = async (values, setSubmitting) => {
    const formData = new FormData();

    // BASIC
    formData.append("name", values.name);
    formData.append("mobile", values.mobile);
    formData.append("email", values.email);
    formData.append("gstno", values.gstno);
    formData.append("payment_term", values.payment_term);
    formData.append("status", values.status?.value || "");
    formData.append("isRegisteredGSTIN", values.isRegisteredGSTIN?.value || "");

    // RELATIONSHIP MANAGER
    formData.append(
      "relationship_manager_id",
      values.relationship_manager || ""
    );

    // BILLING
    formData.append("billing_address", values.billing_address);
    formData.append("billing_city_id", values.billing_city_id?.value || "");
    formData.append("billing_pincode", values.billing_pincode);
    formData.append("billing_latitude", values.billing_latitude);
    formData.append("billing_longitude", values.billing_longitude);
    formData.append("billing_google_address", values.billing_google_address);

    // SHIPPING
    formData.append(
      "shipping_same_as_billing",
      values.shipping_same_as_billing
    );

    formData.append("shipping_address", values.shipping.address);
    formData.append("shipping_city_id", values.shipping.city?.value || "");
    formData.append("shipping_pincode", values.shipping.pincode);

    /** FIXED — CORRECT FIELDS SENT TO BACKEND */
    formData.append(
      "shipping_latitude",
      values.shipping_latitude || ""
    );
    formData.append(
      "shipping_longitude",
      values.shipping_longitude || ""
    );
    formData.append(
      "shipping_google_address",
      values.shipping_google_address || ""
    );

    // CONTACT PERSON 1
    formData.append("cp1_name", values.cp1_name);
    formData.append("cp1_email", values.cp1_email);
    formData.append("cp1_mobile", values.cp1_mobile);
    formData.append("cp1_designation", values.cp1_designation);

    // CONTACT PERSON 2
    formData.append("cp2_name", values.cp2_name);
    formData.append("cp2_email", values.cp2_email);
    formData.append("cp2_mobile", values.cp2_mobile);
    formData.append("cp2_designation", values.cp2_designation);

    // GST IMAGES
    if (values.gstin_img && Array.isArray(values.gstin_img)) {
      values.gstin_img.forEach((file) => {
        formData.append("gst_images", file);
      });
    }

    dispatch(updateCustomer({ id, formData }))
      .unwrap()
      .then(() => {
        toast.success("Customer updated successfully!");
        navigate("/customerlist");
      })
      .catch((error) => {
        toast.error(error?.message || "Update failed.");
      })
      .finally(() => setSubmitting(false));
  };

  const handleDiscard = () => navigate("/customerlist");

  if (loading || !customerData) return <Loader />;

  return (
    <CustomerForm
      type="edit"
      ref={formRef}
      onFormSubmit={handleSubmit}
      onDiscard={handleDiscard}
    />
  );
};

export default CustomerEdit;

























// import React, { useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getCustomerById,
//   updateCustomer,
// } from "../../../features/customerManagement/customerEditSlice";
// import CustomerForm from "../CustomerForm";
// import Loader from "@/components/Loader";
// import { toast } from "sonner";

// const CustomerEdit = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const formRef = useRef(null);

//   const { loading, customerData, success } = useSelector(
//     (state) => state.customerEdit
//   );

//   // Fetch customer on mount
//   useEffect(() => {
//     dispatch(getCustomerById(id));
//   }, [id]);

//   // When customer data loads → Set form values
//   useEffect(() => {
//     if (customerData && formRef.current?.setValues) {
//       formRef.current.setValues(mapCustomerToForm(customerData));
//     }
//   }, [customerData]);

//   // Mapping backend data to form shape
//   const mapCustomerToForm = (data) => {
//     const { customer, billing, shipping, cp1, cp2 } = data;

//     return {
//       name: customer.name || "",
//       mobile: customer.mobile || "",
//       email: customer.email || "",

//       // GST
//       gstno: customer.gstin || "",
//       // gst_images: customer.gst_images ? [customer.gst_images] : [], // << FIXED
//       gstimg: [],

//       gst_images: customer.gst_images || [], //→ send to backend if needed
//       gstin_img: customer.gst_images?.length ? customer.gst_images : null, //→ used by CustomerImages.jsx

//       // Relationship Manager (if available)
//       relationship_manager: customer.relationship_manager_id
//         ? String(customer.relationship_manager_id)
//         : "",

//       payment_term: customer.payment_term || "",

//       // -----------------------
//       // BILLING
//       // -----------------------
//       billing_state: billing.state_id
//         ? { value: billing.state_id, label: billing.state_name }
//         : null,

//       billing_district: billing.district_id
//         ? { value: billing.district_id, label: billing.district_name }
//         : null,

//       billing_taluka: billing.taluka_id
//         ? { value: billing.taluka_id, label: billing.taluka_name }
//         : null,

//       billing_city_id: billing.city_id
//         ? { value: billing.city_id, label: billing.city_name }
//         : null,

//       billing_address: billing.address || "",
//       billing_pincode: billing.pincode || "",
//       billing_latitude: billing.latitude || "",
//       billing_longitude: billing.longitude || "",
//       billing_google_address: billing.google_address || "",

//       // -----------------------
//       // SHIPPING
//       // -----------------------
//       shipping_same_as_billing: false,

//       shipping: {
//         state: shipping.state_id
//           ? { value: shipping.state_id, label: shipping.state_name }
//           : null,

//         district: shipping.district_id
//           ? { value: shipping.district_id, label: shipping.district_name }
//           : null,

//         taluka: shipping.taluka_id
//           ? { value: shipping.taluka_id, label: shipping.taluka_name }
//           : null,

//         city: shipping.city_id
//           ? { value: shipping.city_id, label: shipping.city_name }
//           : null,

//         address: shipping.address || "",
//         pincode: shipping.pincode || "",
//         shipping_latitude: shipping.latitude || "",
//         shipping_longitude: shipping.longitude || "",
//         shipping_google_address: shipping.google_address || "",
//       },

//       // CONTACT PERSON 1
//       cp1_name: cp1.name || "",
//       cp1_email: cp1.email || "",
//       cp1_mobile: cp1.mobile || "",
//       cp1_designation: cp1.designation || "",

//       // CONTACT PERSON 2
//       cp2_name: cp2.name || "",
//       cp2_email: cp2.email || "",
//       cp2_mobile: cp2.mobile || "",
//       cp2_designation: cp2.designation || "",

//       latitude: customer.latitude || "",
//       longitude: customer.longitude || "",
//       google_address: customer.google_address || "",

//       status:
//         customer.status === 1
//           ? { label: "Active", value: 1 }
//           : { label: "Inactive", value: 0 },

//       isRegisteredGSTIN:
//         customer.isRegisteredGSTIN === 1
//           ? { label: "Yes", value: 1 }
//           : { label: "No", value: 0 },
//     };
//   };

//   const handleSubmit = async (values, setSubmitting) => {
//     const formData = new FormData();

//     // ------- BASIC FIELDS -------
//     formData.append("name", values.name);
//     formData.append("mobile", values.mobile);
//     formData.append("email", values.email);
//     formData.append("gstno", values.gstno);
//     formData.append("payment_term", values.payment_term);
//     formData.append("status", values.status.value);
//     formData.append("isRegisteredGSTIN", values.isRegisteredGSTIN.value);

//     // ------- RELATIONSHIP MANAGER -------
//     formData.append(
//       "relationship_manager_id",
//       values.relationship_manager || ""
//     );

//     // ------- BILLING ADDRESS -------
//     formData.append("billing_address", values.billing_address);
//     formData.append("billing_city_id", values.billing_city_id?.value || "");
//     formData.append("billing_pincode", values.billing_pincode);
//     formData.append("billing_latitude", values.billing_latitude);
//     formData.append("billing_longitude", values.billing_longitude);
//     formData.append("billing_google_address", values.billing_google_address);

//     // ------- SHIPPING ADDRESS -------
//     formData.append(
//       "shipping_same_as_billing",
//       values.shipping_same_as_billing
//     );

//     formData.append("shipping_address", values.shipping.address);
//     formData.append("shipping_city_id", values.shipping.city?.value || "");
//     formData.append("shipping_pincode", values.shipping.pincode);

//     // formData.append("shipping_latitude", values.shipping_latitude || "");
//     // formData.append("shipping_longitude", values.shipping_longitude || "");
//     // formData.append(
//     //   "shipping_google_address",
//     //   values.shipping_google_address || ""
//     // );

//     // formData.append("shipping_latitude", values.latitude || "");
//     // formData.append("shipping_longitude", values.longitude || "");
//     // formData.append("shipping_google_address", values.google_address || "");

//     formData.append("shipping_latitude", values.shipping.latitude || "");
//     formData.append("shipping_longitude", values.shipping.longitude || "");
//     formData.append("shipping_google_address", values.shipping.google_address || "");

//     // ------- CONTACT PERSON 1 -------
//     formData.append("cp1_name", values.cp1_name);
//     formData.append("cp1_email", values.cp1_email);
//     formData.append("cp1_mobile", values.cp1_mobile);
//     formData.append("cp1_designation", values.cp1_designation);

//     // ------- CONTACT PERSON 2 -------
//     formData.append("cp2_name", values.cp2_name);
//     formData.append("cp2_email", values.cp2_email);
//     formData.append("cp2_mobile", values.cp2_mobile);
//     formData.append("cp2_designation", values.cp2_designation);

//     // ------- GST IMAGES UPLOAD -------
//     if (values.gstin_img && Array.isArray(values.gstin_img)) {
//       values.gstin_img.forEach((file) => {
//         formData.append("gst_images", file); // <-- correct multer field name
//       });
//     }

//     dispatch(updateCustomer({ id, formData }))
//       .unwrap()
//       .then(() => {
//         toast.success("Customer updated successfully!");
//         navigate("/customerlist");
//       })
//       .catch((error) => {
//         toast.error(error?.message || "Update failed.");
//       })
//       .finally(() => setSubmitting(false));
//   };

//   const handleDiscard = () => navigate("/customerlist");

//   if (loading || !customerData) return <Loader />;

//   return (
//     <CustomerForm
//       type="edit"
//       ref={formRef}
//       onFormSubmit={handleSubmit}
//       onDiscard={handleDiscard}
//     />
//   );
// };

// export default CustomerEdit;
