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
} from "@/components/ui/dialog"; //This opens a modal popup and Used to show the full image preview when user clicks the Eye icon

import { HiEye, HiTrash } from "react-icons/hi"; //HiEye → Show image and HiTrash → Delete/remove image
import { Field } from "formik"; 

// Dropdown values for GST Registered and Shown inside the Select component
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
              /*
              This component receives Formik props:

            values → Current form values

            errors → Validation errors

            touched → Tracks which fields user has interacted with

            setFieldValue → Used to update a specific Formik field

            handleChange → For simple input fields (GST no)
              */

  //step 1
  const [selectedImg, setSelectedImg] = useState(null); //use state for hold selected image . selectedImg:- It stores The URL of clicked image and and its used for dialog knows which image to show

  const [viewOpen, setViewOpen] = useState(false); //use state for view image .  viewOpen:- its stores Boolean (true/false) and it is used To open/close full preview dialog

  //Means : If user clicks the Eye Icon, selectedImg becomes "uploads/gst-123.png" and viewOpen becomes true and Dialog opens immediately.



  //step 2:  Open preview dialog . Called when user clicks Eye icon
  const onViewOpen = (imgUrl) => {
    setSelectedImg(imgUrl); //Saves the image URL
    setViewOpen(true);  //Opens the preview dialog
  };

  //it Closes modal 
  const onDialogClose = () => {
    setViewOpen(false);
    setTimeout(() => setSelectedImg(null), 300); //Gives 300ms delay before clearing image
  };

  // Validation before upload
  const beforeUpload = (files) => {
    let valid = true;
    const allowedTypes = ["image/jpeg", "image/png"]; //Allowed formats → JPG, PNG 
    const maxSize = 5 * 1024 * 1024; // Max size → 5MB
 
    //Loop through each uploaded file
    for (let f of files) {
      if (!allowedTypes.includes(f.type)) { //If format is wrong → return error text
        valid = "Please upload a .jpeg or .png file";
      }
      if (f.size >= maxSize) { //If file too big → return error text
        valid = "Upload image cannot be more than 5MB";
      }
    }
    return valid;
  };

  // store file in Formik
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);  //Extract uploaded file(s) from <input type="file"> and Convert FileList → Array
 
    const validated = beforeUpload(files); //Validate using earlier function
    if (validated !== true) {
      alert(validated); //If invalid → show alert message
      return;
    }

    setFieldValue("gstin_img", files); //Formik stores the image files inside form state and Field name: gstin_img and This field will be sent to backend when submitting the form
  };

  // remove uploaded file and Clears uploaded image
  const removeImage = () => {
    setFieldValue("gstin_img", null); //Removes preview 
    setSelectedImg(null); //and Deletes from Formik state
  };

  // detect if GST image is existing URL or newly uploaded file
  const getPreviewImages = () => {
    if (!values.gstin_img) return []; //If no image → return empty preview array

    // case 1: Image from Backend (URL string) ,When editing customer, backend returns: ex. gstin_img: ["http://localhost/uploads/img1.png"]
    if (
      Array.isArray(values.gstin_img) &&
      typeof values.gstin_img[0] === "string"
    ) {
      return values.gstin_img; //Returns URLs directly for preview
    }

    // case 2: Newly uploaded file (Blob)
    if (Array.isArray(values.gstin_img)) {
      return values.gstin_img.map((f) => URL.createObjectURL(f)); //Converts File object → Temporary URL ,Example: blob:http://localhost/ajdsa23123
    }

    return [];
  };

  const previews = getPreviewImages(); //Final array of preview URLs and Used to render images in JSX

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
                {/* Eye → Opens Dialog */}
                <HiEye /> 
              </button>
              <button
                className="text-white text-2xl"
                onClick={() => removeImage(index)}
              >
                {/* Trash → Remove image */}
                <HiTrash />
              </button>
            </div>
          </div>
        ))}

        {/* FILE INPUT */}
        {/* When user chooses file:  handleFileChange() and validate and save in formik field "gstin_img" */}
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

      {/* Full Image Preview Dialog*/}
      {/* ShadCN dialog component and Shows full-screen preview */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>GST Image Preview</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {/* Shows selected image in large view */}
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

/* 
FINAL SUMMARY (Simple Explanation) 
| Functionality      | How it works                              |
| ------------------ | ----------------------------------------- |
| Upload GST image   | User selects → validate → save to Formik  |
| Preview thumbnails | Convert file → URL → show in `<img>`      |
| Preview full image | Eye icon → open dialog                    |
| Delete image       | removeImage() clears Formik field         |
| Support Edit Mode  | If backend sends image URL → use directly |

*/
