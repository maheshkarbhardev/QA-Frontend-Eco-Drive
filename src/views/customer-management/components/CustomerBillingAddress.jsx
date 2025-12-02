import React, { useState,useEffect } from 'react'
import Select from 'react-select';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axiosInstance from '../../../api/axiosInstance';


const CustomerBillingAddress = (props) => {
  const {touched,values,errors,setFieldValue,handleChange} = props; //Destructures values, touched, errors,setFieldValue,handleChange from props (these come from parent Formik render props).these provide current form values and validation state to render controls and error messages.

  //step 1 
  const [state,setState]=useState([]);
  const [districts,setDistricts]=useState([]);
  const [talukas,setTalukas]=useState([]);
  const [cities,setCities]=useState([]);

  
  //step 3: fetch states on component mount
  useEffect(()=>{
    fetchStates();
  },[])

  useEffect(() => {
  if (values.billing_state?.value) {
    fetchDistricts(values.billing_state.value);
  }
}, [values.billing_state]);

useEffect(() => {
  if (values.billing_district?.value) {
    fetchTalukas(values.billing_district.value);
  }
}, [values.billing_district]);

useEffect(() => {
  if (values.billing_taluka?.value) {
    fetchCities(values.billing_taluka.value);
  }
}, [values.billing_taluka]);

  //step 2 : fetch states from api
  const fetchStates=async()=>{
    try {
        const res=await axiosInstance.get("/customer/states");
        if(res.data.success){
            setState(res.data.data.map((item)=>({
                label:item.name,
                value:item.id
            })))
        }
    } catch (error) {
        console.log("fetchStates error:", error);
    }
  }

  //step 4: get districts when state changes
  const fetchDistricts=async(stateId)=>{
    try {
        const res=await axiosInstance.get(`/customer/districts/${stateId}`);
        if(res.data.success){
            setDistricts(res.data.data.map((item)=>({
                label:item.name,
                value:item.id
            })))
        }
    } catch (error) {
        console.log("fetchDistricts error:", error);
    }
  } 

  //step 5: get talukas when district changes
  const fetchTalukas=async(districtId)=>{
    try {
        const res=await axiosInstance.get(`/customer/talukas/${districtId}`);
        if(res.data.success){
            setTalukas(res.data.data.map((item=> ({
                label:item.name,
                value:item.id
            }))))
        }
    } catch (error) {
        console.log("fetchTaluka error:", error);
    }
  }

  //step6: get cities when taluka changes
  const fetchCities=async(talukaId)=>{
    try {
        const res=await axiosInstance.get(`/customer/cities/${talukaId}`);
        if(res.data.success){
            setCities(res.data.data.map((item)=> ({
                label:item.name,
                value:item.id
            })))
        }
    } catch (error) {
        console.log("fetchCities error:", error);
    }
  }

  //step 7: handle state change
  const handleStateChange=(selected)=>{
    setFieldValue("billing_state",selected); //selected options label and value has set in billing_state

    // Reset dependent fields
    setFieldValue("billing_district", null);
    setFieldValue("billing_taluka", null);
    setFieldValue("billing_city_id", null);

    //keep other options empty
    setDistricts([]);
    setTalukas([]);
    setCities([]);

    //if billing_state is selected then fetchDistricts() calls and pass id of state
    if(selected){
        fetchDistricts(selected.value);
    }
  }

  //step 8: handle district change
  const handleDistrictChange=(selected)=>{
    setFieldValue("billing_district",selected);

    //reset depenedent fields
    setFieldValue("billing_taluka", null);
    setFieldValue("billing_city_id", null);

    setTalukas([]);
    setCities([]);

    if(selected){
        fetchTalukas(selected.value);
    }
  }

  //step 9: handle taluka change
  const handleTalukaChange=(selected)=>{
    setFieldValue("billing_taluka",selected);

    // Reset dependent fields
    setFieldValue("billing_city_id", null);
    
    setCities([]);

    if(selected){
        fetchCities(selected.value);
    }
  }

  //step 10: handle city change
  const handleCityChange=(selected)=>{
    setFieldValue("billing_city_id",selected);
  }


  return (
    <div>
        <div className='border-b-2 border-gray-300 pb-[70px]' >
            <span className='text-[20px] font-semibold ml-[30px]  '>Billing Address</span>

            <div className='flex flex-col'>

                {/* State and District Dropdown */}
                <div className='flex flex-row'>

                    {/* State dropdown */}
                    <div className='flex flex-col'>
                        <Label htmlFor="billing_state" className="text-[17px] ml-[30px] mt-[20px]"><span className='text-red-500 text-sm mr-1'>*</span> State</Label>

                        <Select
                        options={state}
                        value={values.billing_state}
                        onChange={handleStateChange}
                        placeholder="Select..."
                        isSearchable
                        className='w-[300px] ml-[30px] mt-[7px]'
                        />

                        {touched.billing_state && errors.billing_state && (
                            <p className='text-red-500 text-sm mt-1'>{errors.billing_state}</p>
                        )}
                    </div>


                    {/* District Dropdown */}
                    <div className='flex flex-col'>
                        <Label htmlFor="billing_district" className="text-[17px] ml-[30px] mt-[20px]"><span className='text-red-500 text-sm mr-1'>*</span> District</Label>

                        <Select
                        options={districts}
                        value={values.billing_district}
                        onChange={handleDistrictChange}
                        placeholder="Select..."
                        isDisabled={!values.billing_state} //if no values.billing_state then this dropdown is disable
                        isSearchable
                        className='w-[300px] ml-[30px] mt-[7px]'
                        />

                        {touched.billing_district && errors.billing_district && (
                            <p className='text-red-500 text-sm mt-1'>{errors.billing_district}</p>
                        )}
                    </div>
                </div>

                {/* Taluka and City Dropdown */}
                <div className='flex flex-row'>

                    {/* Taluka dropdown */}
                    <div className='flex flex-col'>
                        <Label htmlFor="billing_taluka" className="text-[17px] ml-[30px] mt-[20px]"><span className='text-red-500 text-sm mr-1'>*</span>Taluka</Label>

                        <Select
                        options={talukas}
                        value={values.billing_taluka}
                        onChange={handleTalukaChange}
                        placeholder="Select..."
                        isDisabled={!values.billing_district}
                        isSearchable
                        className='w-[300px] ml-[30px] mt-[10px]'
                        />

                        {touched.billing_taluka && errors.billing_taluka && (
                            <p className='text-red-500 text-sm mt-1'>{errors.billing_taluka}</p>
                        )}
                    </div>


                    {/* City Dropdown */}
                    <div className='flex flex-col'>
                        <Label htmlFor="billing_city_id" className="text-[17px] ml-[30px] mt-[20px]"><span className='text-red-500 text-sm mr-1'>*</span> City</Label>

                        <Select
                        options={cities}
                        value={values.billing_city_id}
                        onChange={handleCityChange}
                        placeholder="Select..."
                        isDisabled={!values.billing_taluka}
                        isSearchable
                        className='w-[300px] ml-[30px] mt-[10px]'
                        />

                        {touched.billing_city_id && errors.billing_city_id && (
                            <p className='text-red-500 text-sm mt-1'>{errors.billing_city_id}</p>
                        )}
                    </div>
                </div>


                {/* Address and Pincode */}
                <div className='flex flex-row'>

                    {/* Address Field */}
                    <div className='flex flex-col'>
                        <Label htmlFor="billing_address" className="text-[17px] ml-[30px] mt-[20px]"><span className='text-red-500 text-sm mr-1'>*</span> Address</Label>

                        <Input
                        id="billing_address"
                        name="billing_address"
                        value={values.billing_address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="w-[300px] ml-[30px] mt-[10px] border border-gray-300"
                        />

                        {touched.billing_address && errors.billing_address && (
                            <p className='text-red-500 text-sm mt-1'>{errors.billing_address}</p>
                        )}
                    </div>


                    {/* Pincode Field */}
                    <div className='flex flex-col'>
                        <Label htmlFor="billing_pincode" className="text-[17px] ml-[30px] mt-[20px]"><span className='text-red-500 text-sm mr-1'>*</span> Pincode</Label>

                        <Input
                        id="billing_pincode"
                        name="billing_pincode"
                        value={values.billing_pincode}
                        onChange={handleChange}
                        placeholder="Pincode"
                        className="w-[300px] ml-[30px] mt-[10px] border border-gray-300"
                        />

                        {touched.billing_pincode && errors.billing_pincode && (
                            <p className='text-red-500 text-sm mt-1'>{errors.billing_pincode}</p>
                        )}
                    </div>
                </div>



            </div>
        </div>
    </div>
  )
}

export default CustomerBillingAddress