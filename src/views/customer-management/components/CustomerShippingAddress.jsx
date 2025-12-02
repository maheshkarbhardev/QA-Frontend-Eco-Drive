import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import axiosInstance from "../../../api/axiosInstance";

const CustomerShippingAddress = (props) => {
  const { touched, values, errors, setFieldValue, handleChange } = props;

  //step 1
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [cities, setCities] = useState([]);

  //step 3: fetch states when component mount
  useEffect(() => {
    fetchStates();
  }, []);

  //step 2 : to get all states from api
  const fetchStates = async () => {
    try {
      const res = await axiosInstance.get("/customer/states");
      if (res.data.success) {
        setStates(
          res.data.data.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      }
    } catch (error) {
      console.log("fetchStates error:", error);
    }
  };

  //step 4: fetch districts
  const fetchDistricts = async (stateId) => {
    try {
      const res = await axiosInstance.get(`/customer/districts/${stateId}`);
      if (res.data.success) {
        setDistricts(
          res.data.data.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      }
    } catch (error) {
      console.log("fetchDistricts error:", error);
    }
  };

  //step 5: fetch taluka
  const fetchTalukas = async (districtId) => {
    try {
      const res = await axiosInstance.get(`/customer/talukas/${districtId}`);
      if (res.data.success) {
        setTalukas(
          res.data.data.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      }
    } catch (error) {
      console.log("fetchTalukas error:", error);
    }
  };

  //step 6: fetch cities
  const fetchCities = async (talukaId) => {
    try {
      const res = await axiosInstance.get(`/customer/cities/${talukaId}`);
      if (res.data.success) {
        setCities(
          res.data.data.map((item) => ({
            label: item.name,
            value: item.id,
          }))
        );
      }
    } catch (error) {
      console.log("fetchCities error:", error);
    }
  };

  // ========================================
  // step 7: SAME AS BILLING CHECKBOX
  // ========================================
  const handleSameAsBilling = (checked) => {
    setFieldValue("shipping_same_as_billing", checked);

    if (checked) {
      // COPY BILLING → SHIPPING
      setFieldValue("shipping", {
        state: values.billing_state,
        district: values.billing_district,
        taluka: values.billing_taluka,
        city: values.billing_city_id,
        address: values.billing_address,
        pincode: values.billing_pincode,
      });

      // ALSO COPY LAT/LONG/GOOGLE
      setFieldValue("shipping_latitude", values.billing_latitude);
      setFieldValue("shipping_longitude", values.billing_longitude);
      setFieldValue("shipping_google_address", values.billing_google_address);

      // LOAD DROPDOWN LISTS
      if (values.billing_state?.value) fetchDistricts(values.billing_state.value);
      if (values.billing_district?.value) fetchTalukas(values.billing_district.value);
      if (values.billing_taluka?.value) fetchCities(values.billing_taluka.value);
    } else {
      // RESET SHIPPING
      setFieldValue("shipping", {
        state: null,
        district: null,
        taluka: null,
        city: null,
        address: "",
        pincode: "",
      });

      setFieldValue("shipping_latitude", "");
      setFieldValue("shipping_longitude", "");
      setFieldValue("shipping_google_address", "");

      setDistricts([]);
      setTalukas([]);
      setCities([]);
    }
  };

  // ========================================
  // HANDLE DROPDOWN CHANGES
  // ========================================
  const handleStateChange = (selected) => {
    setFieldValue("shipping.state", selected);

    setFieldValue("shipping.district", null);
    setFieldValue("shipping.taluka", null);
    setFieldValue("shipping.city", null);

    setDistricts([]);
    setTalukas([]);
    setCities([]);

    if (selected) fetchDistricts(selected.value);
  };

  const handleDistrictChange = (selected) => {
    setFieldValue("shipping.district", selected);

    setFieldValue("shipping.taluka", null);
    setFieldValue("shipping.city", null);

    setTalukas([]);
    setCities([]);

    if (selected) fetchTalukas(selected.value);
  };

  const handleTalukaChange = (selected) => {
    setFieldValue("shipping.taluka", selected);

    setFieldValue("shipping.city", null);
    setCities([]);

    if (selected) fetchCities(selected.value);
  };

  const handleCityChange = (selected) => {
    setFieldValue("shipping.city", selected);
  };

  const isDisabled = values.shipping_same_as_billing;

  return (
    <div>
      <span className="text-[20px] font-semibold ml-[30px]">Shipping Address</span>

      {/* SAME AS BILLING */}
      <div className="flex flex-row gap-3 mt-[20px] items-center ml-[30px]">
        <Checkbox
          id="same_as_billing"
          checked={values.shipping_same_as_billing}
          onCheckedChange={handleSameAsBilling}
          className="border border-gray-400"
        />
        <Label htmlFor="same_as_billing" className="text-[15px] font-normal">
          Same as Billing
        </Label>
      </div>

      {/* FIELDS */}
      <div className="flex flex-col">

        {/* State + District */}
        <div className="flex flex-row">
          {/* State */}
          <div className="flex flex-col">
            <Label className="ml-[30px] mt-[20px]"><span className="text-red-500">*</span> State</Label>

            <Select
              options={states}
              value={values.shipping.state}
              onChange={handleStateChange}
              placeholder="Select..."
              isDisabled={isDisabled}
              className="w-[300px] ml-[30px] mt-[10px]"
            />
          </div>

          {/* District */}
          <div className="flex flex-col">
            <Label className="ml-[30px] mt-[20px]"><span className="text-red-500">*</span> District</Label>

            <Select
              options={districts}
              value={values.shipping.district}
              onChange={handleDistrictChange}
              placeholder="Select..."
              isDisabled={isDisabled || !values.shipping.state}
              className="w-[300px] ml-[30px] mt-[10px]"
            />
          </div>
        </div>

        {/* Taluka + City */}
        <div className="flex flex-row">

          {/* Taluka */}
          <div className="flex flex-col">
            <Label className="ml-[30px] mt-[20px]"><span className="text-red-500">*</span> Taluka</Label>

            <Select
              options={talukas}
              value={values.shipping.taluka}
              onChange={handleTalukaChange}
              placeholder="Select..."
              isDisabled={isDisabled || !values.shipping.district}
              className="w-[300px] ml-[30px] mt-[10px]"
            />
          </div>

          {/* City */}
          <div className="flex flex-col">
            <Label className="ml-[30px] mt-[20px]"><span className="text-red-500">*</span> City</Label>

            <Select
              options={cities}
              value={values.shipping.city}
              onChange={handleCityChange}
              placeholder="Select..."
              isDisabled={isDisabled || !values.shipping.taluka}
              className="w-[300px] ml-[30px] mt-[10px]"
            />
          </div>
        </div>

        {/* Address + Pincode */}
        <div className="flex flex-row">
          {/* Address */}
          <div className="flex flex-col">
            <Label className="ml-[30px] mt-[20px]"><span className="text-red-500">*</span> Address</Label>

            <Input
              name="shipping.address"
              value={values.shipping.address}
              onChange={handleChange}
              placeholder="Address"
              disabled={isDisabled}
              className="w-[300px] ml-[30px] mt-[10px]"
            />
          </div>

          {/* Pincode */}
          <div className="flex flex-col">
            <Label className="ml-[30px] mt-[20px]"><span className="text-red-500">*</span> Pincode</Label>

            <Input
              name="shipping.pincode"
              value={values.shipping.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              disabled={isDisabled}
              className="w-[300px] ml-[30px] mt-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerShippingAddress;
