import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


const CustomerContactPerson = (props) => {
    const {touched,values,errors,setFieldValue,handleChange}=props; // get formik props from parent.


  return (
    <div>
        {/* Contact Person 1 */}
        <div className='flex flex-col  border-b-2 border-gray-300 pb-[70px]'>
            <span className='text-[20px] font-semibold ml-[30px]' >Contact Person 1</span>
            {/* Name and Email */}
            <div className='flex flex-row mt-[20px]'>

                {/* Name */}
                <div className='flex flex-col'>
                    <Label htmlFor="cp1_name" className="text-[17px] ml-[30px] mt-[10px]">Name</Label>

                    <Input
                    id="cp1_name"
                    name="cp1_name"
                    value={values.cp1_name}
                    onChange={handleChange}
                    placeholder="Contact Person Name"
                    autoComplete="off"
                    className="w-[300px] ml-[30px] mt-[7px] border border-gray-300"
                    />

                    {touched.cp1_name && errors.cp1_name && (
                        <p className='text-red-500 text-sm mt-1'>{errors.cp1_name}</p>
                    )}
                </div>

                {/* Email */}
                <div className='flex flex-col'>
                    <Label htmlFor="cp1_email" className="text-[17px] ml-[30px] mt-[10px]">Email</Label>

                    <Input
                    id="cp1_email"
                    type="email"
                    name="cp1_email"
                    value={values.cp1_email}
                    onChange={handleChange}
                    placeholder="Contact Person Email"
                    autoComplete="off"
                    className="w-[300px] ml-[30px] mt-[7px] border border-gray-300"
                    />

                    {touched.cp1_email && errors.cp1_email && (
                        <p className='text-red-500 text-sm mt-1'>{errors.cp1_email}</p>
                    )}
                </div>

            </div>

            {/*Mobile and Designation*/}
            <div className='flex flex-row mt-[30px]'>

                {/* Mobile */}
                <div className='flex flex-col'>
                    <Label htmlFor="cp1_mobile" className="text-[17px] ml-[30px]
                    ">Mobile</Label>

                    <Input
                    id="cp1_mobile"
                    name="cp1_mobile"
                    value={values.cp1_mobile}
                    onChange={handleChange}
                    placeholder="Enter the mobile number here"
                    autoComplete="off"
                    className="w-[300px] ml-[30px] mt-[7px] border border-gray-300"
                    />

                    {touched.cp1_mobile && errors.cp1_mobile && (
                        <p className='text-red-500 text-sm mt-1'>{errors.cp1_mobile}</p>
                    )}
                </div>

                {/* Designation */}
                <div className='flex flex-col'>
                    <Label htmlFor="cp1_designation" className="text-[17px] ml-[30px]">Designation</Label>

                    <Input
                    id="cp1_designation"
                    name="cp1_designation"
                    value={values.cp1_designation}
                    onChange={handleChange}
                    placeholder="Enter designation here"
                    autoComplete="off"
                    className="w-[300px] ml-[30px] mt-[7px] border border-gray-300"
                    />

                    {touched.cp1_designation && errors.cp1_designation && (
                        <p className='text-red-500 text-sm mt-1'>{errors.cp1_designation}</p>
                    )}
                </div>
            </div>

        </div>



        {/* Contact Person 2 */}
        <div className='flex flex-col  border-b-2 border-gray-300 pb-[70px] '>
            <span className='text-[20px] font-semibold ml-[30px] mt-[30px]' >Contact Person 2</span>
            {/* Name and Email */}
            <div className='flex flex-row mt-[20px]'>

                {/* Name */}
                <div className='flex flex-col'>
                    <Label htmlFor="cp2_name" className="text-[17px] ml-[30px] mt-[10px]">Name</Label>

                    <Input
                    id="cp2_name"
                    name="cp2_name"
                    value={values.cp2_name}
                    onChange={handleChange}
                    placeholder="Contact Person Name"
                    autoComplete="off"
                    className="w-[300px] ml-[30px] mt-[7px] border border-gray-300"
                    />

                    {touched.cp2_name && errors.cp2_name && (
                        <p className='text-red-500 text-sm mt-1'>{errors.cp2_name}</p>
                    )}
                </div>

                {/* Email */}
                <div className='flex flex-col'>
                    <Label htmlFor="cp2_email" className="text-[17px] ml-[30px] mt-[10px]">Email</Label>

                    <Input
                    id="cp2_email"
                    type="email"
                    name="cp2_email"
                    value={values.cp2_email}
                    onChange={handleChange}
                    placeholder="Contact Person Email"
                    autoComplete="off"
                    className="w-[300px] ml-[30px] mt-[7px] border border-gray-300"
                    />

                    {touched.cp2_email && errors.cp2_email && (
                        <p className='text-red-500 text-sm mt-1'>{errors.cp2_email}</p>
                    )}
                </div>

            </div>

            {/*Mobile and Designation*/}
            <div className='flex flex-row mt-[30px]'>

                {/* Mobile */}
                <div className='flex flex-col'>
                    <Label htmlFor="cp1_mobile" className="text-[17px] ml-[30px]
                    ">Mobile</Label>

                    <Input
                    id="cp2_mobile"
                    name="cp2_mobile"
                    value={values.cp2_mobile}
                    onChange={handleChange}
                    placeholder="Enter the mobile number here"
                    autoComplete="off"
                    className="w-[300px] ml-[30px] mt-[7px] border border-gray-300"
                    />

                    {touched.cp2_mobile && errors.cp2_mobile && (
                        <p className='text-red-500 text-sm mt-1'>{errors.cp2_mobile}</p>
                    )}
                </div>

                {/* Designation */}
                <div className='flex flex-col'>
                    <Label htmlFor="cp2_designation" className="text-[17px] ml-[30px]">Designation</Label>

                    <Input
                    id="cp2_designation"
                    name="cp2_designation"
                    value={values.cp2_designation}
                    onChange={handleChange}
                    placeholder="Enter designation here"
                    autoComplete="off"
                    className="w-[300px] ml-[30px] mt-[7px] border border-gray-300"
                    />

                    {touched.cp2_designation && errors.cp2_designation && (
                        <p className='text-red-500 text-sm mt-1'>{errors.cp2_designation}</p>
                    )}
                </div>
            </div>

        </div>
    </div>
  )
}

export default CustomerContactPerson