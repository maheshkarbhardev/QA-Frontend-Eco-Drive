import React from "react";
import { Label } from "@/components/ui/label";
import { Field } from "formik";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomerInformationFields = (props) => {
  const { touched, values, errors, setFieldValue, handleChange } = props; //→ Gets formik props from parent.

  return (
    <div>
      {/* Customer Name and Primary Contact No. Primary Email ,Payment Term , Realtinship Manager */}
      <div className="flex flex-col border-r-2 border-gray-200 pr-[30px] mt-[20px] border-b-2 mb-[20px] pb-[20px]">
        {/* Customer Name and Primary Contact No. */}
        <div className="flex flex-row">
          {/* Customer Name */}
          <div className="flex flex-col">
            <Label htmlFor="name" className="text-[17px] ml-[30px] mt-[10px]">
              {" "}
              <span className="text-red-500 mr-1">*</span> Customer Name{" "}
            </Label>

            <Input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Name"
              autoComplete="off"
              className="w-[300px] ml-[30px] mt-[7px] border border-gray-300"
            />

            {touched.name && errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Primary Contact No. */}
          <div className="flex flex-col">
            <Label htmlFor="mobile" className="mt-[10px] ml-[30px] text-[17px]">
              <span className="text-red-500 mr-1">*</span> Primary Contact No.
            </Label>

            <Input
              id="mobile"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              placeholder="Contact no."
              autoComplete="off"
              className="w-[300px] ml-[30px] mt-[7px] border border-gray-300"
            />

            {touched.mobile && errors.mobile && (
              <p className="text-red-500">{errors.mobile}</p>
            )}
          </div>
        </div>

        {/* Primary Email and Payment Terms */}
        <div className="flex flex-row">
          {/* Primary Email */}
          <div className="flex flex-col">
            <Label htmlFor="email" className="text-[17px] ml-[30px] mt-[20px]">
              {" "}
              <span className="text-red-500 mr-1">*</span> Primary Email
            </Label>

            <Input
              id="email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              autoComplete="off"
              className="w-[300px] ml-[30px] mt-[7px] border border-gray-300"
            />

            {touched.email && errors.email && (
              <p className="text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Payment Terms  */}
          <div className="flex flex-col">
            <Label
              htmlFor="payment_term"
              className="text-[17px] ml-[30px] mt-[20px]"
            >
              {" "}
              <span className="text-red-500 mr-1">*</span> Payment Terms (in
              Days)
            </Label>

            <Input
              id="payment_term"
              type="number"
              name="payment_term"
              value={values.payment_term}
              onChange={(e) =>
                setFieldValue("payment_term", Number(e.target.value)) //it convert string into numbers type using Number().
              }
              placeholder="Payment Terms"
              autoComplete="off"
              className="w-[300px] ml-[30px] mt-[7px] border border-gray-300"
            />

            {touched.payment_term && errors.payment_term && (
              <p className="text-red-500 text-sm mt-1">{errors.payment_term}</p>
            )}
          </div>
        </div>

        {/* Relationship manager */}
        <div className="flex flex-row">
          {/* Relationship manager */}
          <div className="flex flex-col">
            <Label
              htmlFor="relationship_manager"
              className="text-[17px] ml-[30px] mt-[20px]"
            >
              {" "}
              <span className="text-red-500 mr-1">*</span>
              Relationship Manager
            </Label>

            <Select
              value={values.relationship_manager}
              onValueChange={(value) =>
                setFieldValue("relationship_manager", value)
              }
            >
              <SelectTrigger className="w-[300px] mt-[10px] ml-[30px] border border-gray-300">
                <SelectValue placeholder="Select ..." />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Irfan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {touched.relationship_manager && errors.relationship_manager && (
              <p className="text-red-500 text-sm mt-1">
                {errors.relationship_manager}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInformationFields;
