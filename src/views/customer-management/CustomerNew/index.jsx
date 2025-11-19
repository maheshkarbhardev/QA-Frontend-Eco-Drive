import React, { useCallback } from "react";
import CustomerForm from "../CustomerForm/index";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../../api/axiosInstance";

const CustomerNew = () => {
  const navigate = useNavigate();

  const handleFormSubmit = useCallback(
    async (values, setSubmitting) => {
      try {
        setSubmitting(true);

        const formData = new FormData();

        // BASIC
        formData.append("name", values.name);
        formData.append("mobile", values.mobile);
        formData.append("email", values.email);

        // GST
        formData.append(
          "isRegisteredGSTIN",
          values.isRegisteredGSTIN?.value || 0
        );
        formData.append("gstno", values.gstno || "");

        if (values.gstimg && values.gstimg.length > 0) {
          formData.append("gst_images", values.gstimg[0]);
        }

        // PAYMENT
        formData.append("payment_term", values.payment_term);

        // BILLING
        formData.append("billing_address", values.billing_address);
        formData.append("billing_pincode", values.billing_pincode);
        formData.append("billing_latitude", values.billing_latitude);
        formData.append("billing_longitude", values.billing_longitude);
        formData.append(
          "billing_google_address",
          values.billing_google_address
        );
        // formData.append("billing_city_id", values.billing_city_id.value);
        formData.append("billing_city_id", values.billing_city_id?.value || "");

        // SHIPPING
        formData.append(
          "shipping_same_as_billing",
          values.shipping_same_as_billing ? 1 : 0
        );

        if (values.shipping_same_as_billing) {
          formData.append("shipping_address", values.billing_address);
          formData.append("shipping_pincode", values.billing_pincode);
          formData.append("shipping_latitude", values.billing_latitude);
          formData.append("shipping_longitude", values.billing_longitude);
          formData.append(
            "shipping_google_address",
            values.billing_google_address
          );
          formData.append("shipping_city_id", values.billing_city_id.value);
        } else {
          formData.append("shipping_address", values.shipping.address);
          formData.append("shipping_pincode", values.shipping.pincode);
          formData.append("shipping_latitude", values.shipping_latitude);
          formData.append("shipping_longitude", values.shipping_longitude);
          formData.append(
            "shipping_google_address",
            values.shipping_google_address
          );
          formData.append("shipping_city_id", values.shipping.city.value);
        }

        // CONTACT PERSON 1
        formData.append("cp1_name", values.cp1_name || "");
        formData.append("cp1_email", values.cp1_email || "");
        formData.append("cp1_mobile", values.cp1_mobile || "");
        formData.append("cp1_designation", values.cp1_designation || "");

        // CONTACT PERSON 2
        formData.append("cp2_name", values.cp2_name || "");
        formData.append("cp2_email", values.cp2_email || "");
        formData.append("cp2_mobile", values.cp2_mobile || "");
        formData.append("cp2_designation", values.cp2_designation || "");

        // LOCATION
        formData.append("latitude", values.latitude || "");
        formData.append("longitude", values.longitude || "");
        formData.append("google_address", values.google_address || "");

        // STATUS
        formData.append("status", values.status.value);

        // SEND TO API
        const response = await axiosInstance.post(
          "/customer/addCustomer",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.data.success) {
          toast.success("Customer added successfully!");
          navigate("/customerlist");
        } else {
          toast.error(response.data.message || "Failed to add customer");
        }

        setSubmitting(false);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong");
        setSubmitting(false);
      }
    },
    [navigate]
  );

  const handleDiscard = useCallback(() => {
    navigate("/customerlist");
  }, [navigate]);

  return (
    <div>
      <CustomerForm
        type="new"
        onFormSubmit={handleFormSubmit}
        onDiscard={handleDiscard}
      />
    </div>
  );
};

export default CustomerNew;
