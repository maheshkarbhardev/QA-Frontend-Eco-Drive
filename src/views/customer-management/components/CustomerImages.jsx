import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { HiEye, HiTrash } from "react-icons/hi";
import { Field } from "formik";

// dropdown options
export const options = [
  { label: "Yes", value: "1" },
  { label: "No", value: "0" },
];

const CustomerImages = ({
  touched,
  errors,
  values,
  setFieldValue,
  handleChange,
}) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  // Open preview dialog
  const onViewOpen = (imgUrl) => {
    setSelectedImg(imgUrl);
    setViewOpen(true);
  };

  const onDialogClose = () => {
    setViewOpen(false);
    setTimeout(() => setSelectedImg(null), 300);
  };

  // Validation before upload
  const beforeUpload = (files) => {
    let valid = true;
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (let f of files) {
      if (!allowedTypes.includes(f.type)) {
        valid = "Please upload a .jpeg or .png file";
      }
      if (f.size >= maxSize) {
        valid = "Upload image cannot be more than 5MB";
      }
    }
    return valid;
  };

  // store file in Formik
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const validated = beforeUpload(files);
    if (validated !== true) {
      alert(validated);
      return;
    }

    setFieldValue("gstin_img", files);
  };

  // remove uploaded file
  const removeImage = () => {
    setFieldValue("gstin_img", null);
    setSelectedImg(null);
  };

  // detect if GST image is existing URL or newly uploaded file
  const getPreviewImages = () => {
    if (!values.gstin_img) return [];

    // case 1: backend URLs
    if (
      Array.isArray(values.gstin_img) &&
      typeof values.gstin_img[0] === "string"
    ) {
      return values.gstin_img;
    }

    // case 2: newly uploaded files
    if (Array.isArray(values.gstin_img)) {
      return values.gstin_img.map((f) => URL.createObjectURL(f));
    }

    return [];
  };

  const previews = getPreviewImages();

  return (
    <div className="w-full h-full">
      {/* GST Registered */}
      <div className="flex flex-col">
        <Label htmlFor="isRegisteredGSTIN" className="text-[17px] mt-[30px]">
          <span className="text-red-500 mr-1">*</span>GST Registered
        </Label>

        <Select
          onValueChange={(value) => {
            const selected = options.find((opt) => opt.value === value);
            setFieldValue("isRegisteredGSTIN", selected);
          }}
          value={values.isRegisteredGSTIN?.value || ""}
        >
          <SelectTrigger className="w-[300px] mt-[10px] border border-gray-300">
            <SelectValue placeholder="Select" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {touched.isRegisteredGSTIN && errors.isRegisteredGSTIN && (
          <p className="text-red-500 text-sm mt-1">
            {errors.isRegisteredGSTIN}
          </p>
        )}
      </div>

      {/* GST No */}
      <div className="flex flex-col">
        <Label htmlFor="gstno" className="text-[17px] mt-[40px]">
          GST No.
        </Label>

        <Input
          id="gstno"
          name="gstno"
          value={values.gstno}
          onChange={handleChange}
          placeholder="GST No."
          className="w-[300px] mt-[10px] border border-gray-300"
        />

        {touched.gstno && errors.gstno && (
          <p className="text-red-500 text-sm mt-1">{errors.gstno}</p>
        )}
      </div>

      {/* GST Image Upload */}
      <div className="flex flex-col mt-[30px]">
        <span className="text-[17px] font-semibold">GST Image</span>
        <span className="text-gray-400 text-[14px] mt-[10px]">
          Add or change image for GST
        </span>

        {/* EXISTING IMAGE PREVIEW */}
        {previews.map((img, index) => (
          <div
            key={index}
            className="mt-4 ml-2 flex items-center gap-4 relative group"
          >
            <img src={img} className="w-24 h-24 object-cover border rounded" />

            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center gap-4 rounded">
              <button
                className="text-white text-2xl"
                onClick={() => onViewOpen(img)}
              >
                <HiEye />
              </button>
              <button
                className="text-white text-2xl"
                onClick={() => removeImage(index)}
              >
                <HiTrash />
              </button>
            </div>
          </div>
        ))}

        {/* FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-4 ml-2 border-2 w-[300px] pl-[20px] py-[7px] rounded-[7px]"
        />

        {touched.gstimg && errors.gstimg && (
          <p className="text-red-500 text-sm ml-2 mt-1">{errors.gstimg}</p>
        )}
      </div>

      {/* DIALOG PREVIEW */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>GST Image Preview</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {selectedImg && (
            <img
              src={selectedImg}
              alt="Preview"
              className="max-h-[500px] w-full object-contain rounded "
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerImages;
