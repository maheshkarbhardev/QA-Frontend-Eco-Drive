import React from 'react'
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const customerStatus = [
  { label: "Active", value: "1" },
  { label: "Inactive", value: "0" }
]

const Status = (props) => {
  const { touched, values, errors, setFieldValue } = props

  return (
    <div>
      <div className="flex flex-col">

        {/* Label */}
        <Label htmlFor="status" className="text-[17px] ml-[30px]">
          Status
        </Label>

        {/* Select Dropdown */}
        <Select
          // value must be raw "1" or "0"
          value={values.status?.value || ""}  
          onValueChange={(value) => {
            const selected = customerStatus.find(
              (opt) => opt.value === value
            )
            setFieldValue("status", selected)
          }}
        >
          <SelectTrigger className="w-[600px] border border-gray-300 mt-[10px] ml-[30px]">
            {/* NO placeholder if default selected */}
            <SelectValue>
              {values.status?.label || "Select a status"}
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {customerStatus.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Validation Error */}
        {touched.status && errors.status && (
          <p className="text-red-500 text-sm mt-1 ml-[30px]">
            {errors.status}
          </p>
        )}

      </div>
    </div>
  )
}

export default Status
