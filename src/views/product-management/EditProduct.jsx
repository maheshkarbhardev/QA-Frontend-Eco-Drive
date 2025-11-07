import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  getCategories,
  getUsageUnits,
  getProductById,
  updateProduct,
  clearMessages,
} from "../../features/productManagement/productSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Loader from "@/components/Loader";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { categories, usageUnits, selectedProduct, loading, successMessage, error } =
    useSelector((state) => state.product);

  const [imagePreview, setImagePreview] = useState(null);
  const [initialValues, setInitialValues] = useState({
    category_id: "",
    name: "",
    description: "",
    hsn: "",
    gst: "",
    usage_unit_id: "",
    inventory: "",
    status: "",
    image: null,
  });

  // ✅ Fetch categories, usage units, and product by ID
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUsageUnits());
    if (id) dispatch(getProductById(id));
  }, [dispatch, id]);

  // ✅ When product data fetched, pre-fill form
  useEffect(() => {
    if (selectedProduct) {
      setInitialValues({
        category_id: selectedProduct.category_id?.toString() || "",
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        hsn: selectedProduct.hsn || "",
        gst:
          selectedProduct.igst ||
          selectedProduct.cgst ||
          selectedProduct.sgst ||
          "",
        usage_unit_id: selectedProduct.usage_unit_id?.toString() || "",
        inventory: selectedProduct.inventory?.toString() || "",
        status: selectedProduct.status?.toString() || "",
        image: null,
      });

      if (selectedProduct.image) {
        const baseUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/api$/, "") || "";
        setImagePreview(`${baseUrl}/uploads/${selectedProduct.image}`);
      }
    }
  }, [selectedProduct]);

  // ✅ Handle success & error messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearMessages());
      navigate("/productlist");
    }
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [successMessage, error, dispatch, navigate]);

  // ✅ Validation schema
  const validationSchema = Yup.object({
    category_id: Yup.string().required("Category is required."),
    name: Yup.string().required("Product name is required."),
    description: Yup.string().optional(),
    hsn: Yup.number()
      .required("HSN code is required.")
      .positive("HSN Code must be positive."),
    gst: Yup.number()
      .required("GST % is required")
      .positive("GST % must be positive."),
    usage_unit_id: Yup.string().required("Usage Unit is required."),
    inventory: Yup.string().required("Inventory is required."),
    status: Yup.string().required("Status is required."),
  });

  // ✅ Submit handler
  const handleSubmit = (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === "image" && values.image) {
        formData.append("image", values.image);
      } else {
        formData.append(key, values[key]);
      }
    }
    dispatch(updateProduct({ id, formData }));
  };

  return (
    <div>
      <div className="w-full h-full bg-[#eaeaea] pb-[20px] pt-[20px] border border-white rounded-2xl">
        <span className="text-2xl font-semibold ml-[20px]">Edit Product</span>

        {loading ? (
          <Loader />
        ) : (
          <div className="mr-[20px] h-full bg-white ml-[20px] rounded-2xl mt-[20px] ">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, setFieldValue }) => (
                <Form>
                  <div className="flex flex-row">
                    {/* Category , Product Name , Product Image */}
                    <div className="flex flex-row">
                      {/* Category Dropdown */}
                      <div className="flex flex-col">
                        <Label className="mt-[10px] ml-[20px] text-[17px]">
                          {" "}
                          <span className="text-red-500 ">*</span> Category
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setFieldValue("category_id", value)
                          }
                          value={values.category_id}
                        >
                          <SelectTrigger className="mt-[7px] w-[235px] ml-[10px]">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>

                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem
                                key={cat.id}
                                value={cat.id.toString()}
                              >
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {touched.category_id && errors.category_id && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.category_id}
                          </p>
                        )}
                      </div>

                      {/* Product Name */}
                      <div className="flex flex-col">
                        <Label
                          htmlFor="name"
                          className="mt-[10px] ml-[30px] text-[17px]"
                        >
                          {" "}
                          <span className="text-red-500 mr-1">*</span>Product
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          placeholder="Enter Product Name"
                          className="w-[300px] ml-[30px] mt-[7px]"
                        />

                        {touched.name && errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Product Image */}
                      <div className="flex flex-col ">
                        <Label
                          htmlFor="image"
                          className="mt-[10px] ml-[130px] text-[17px]"
                        >
                          {" "}
                          <span className="text-red-500 mr-1">*</span>Product
                          Image
                        </Label>
                        <span className="text-gray-400 text-[15px] ml-[150px] mt-[10px]">
                          Add or change image for the product
                        </span>
                        <Input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={(event) => {
                            setFieldValue(
                              "image",
                              event.currentTarget.files[0]
                            );
                            setImagePreview(
                              URL.createObjectURL(event.currentTarget.files[0])
                            );
                          }}
                          className="w-[350px] h-[35px] ml-[150px] mt-[15px] "
                        />

                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="preview image"
                            className="w-32 h-32 object-cover mt-2 rounded-md border ml-[150px]"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div>
                    <Label
                      htmlFor="description"
                      className="mt-[10px] ml-[30px] text-[17px]"
                    >
                      Product Description
                    </Label>

                    <Textarea
                      id="description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      placeholder="Write Product Description Here..."
                      className="w-[650px] h-[120px] ml-[10px] mt-[7px]"
                    />
                  </div>

                  {/* HSN code and GST */}
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <Label
                        htmlFor="hsn"
                        className="mt-[10px] ml-[30px] text-[17px]"
                      >
                        {" "}
                        <span className="text-red-500 mr-1">*</span>HSN Code
                      </Label>

                      <Input
                        id="hsn"
                        name="hsn"
                        type="number"
                        value={values.hsn}
                        onChange={handleChange}
                        placeholder="HSN Code"
                        className="ml-[10px] mt-[10px] w-[280px]"
                      />

                      {touched.hsn && errors.hsn && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.hsn}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col ml-[30px]">
                      <Label
                        htmlFor="gst"
                        className="mt-[10px] ml-[30px] text-[17px]"
                      >
                        {" "}
                        <span className="text-red-500 mr-1">*</span>GST %
                      </Label>

                      <Input
                        id="gst"
                        name="gst"
                        type="number"
                        value={values.gst}
                        onChange={handleChange}
                        placeholder="GST"
                        className="ml-[30px] mt-[10px] w-[280px]"
                      />

                      {touched.gst && errors.gst && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.gst}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Usage Unit and Inventory */}
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                      <Label className="mt-[10px] ml-[30px] text-[17px]">
                        {" "}
                        <span className="text-red-500 mr-1">*</span>Usage Unit
                      </Label>

                      <Select
                        onValueChange={(value) =>
                          setFieldValue("usage_unit_id", value)
                        }
                        value={values.usage_unit_id}
                      >
                        <SelectTrigger className="mt-[7px] w-[280px] ml-[10px]">
                          <SelectValue placeholder="Select Usage Unit" />
                        </SelectTrigger>

                        <SelectContent>
                          {usageUnits.map((unit) => (
                            <SelectItem
                              key={unit.id}
                              value={unit.id.toString()}
                            >
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {touched.usage_unit_id && errors.usage_unit_id && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.usage_unit_id}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col ml-[30px]">
                      <Label className="mt-[10px] ml-[30px] text-[17px]">
                        <span className="text-red-500 mr-1">*</span>Inventory
                      </Label>

                      <Select
                        onValueChange={(value) =>
                          setFieldValue("inventory", value)
                        }
                        value={values.inventory}
                      >
                        <SelectTrigger className="mt-[7px] w-[280px] ml-[30px]">
                          <SelectValue placeholder="Select .." />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1">Yes</SelectItem>
                            <SelectItem value="0">No</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {touched.inventory && errors.inventory && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.inventory}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col">
                    <Label className="mt-[10px] ml-[30px] text-[17px]">
                      Status
                    </Label>

                    <Select
                      onValueChange={(value) => setFieldValue("status", value)}
                      value={values.status}
                    >
                      <SelectTrigger className="mt-[7px] w-[280px] ml-[10px]">
                        <SelectValue placeholder="Select .." />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1">Active</SelectItem>
                          <SelectItem value="0">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {touched.status && errors.status && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.status}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-row gap-[20px] mt-[20px] ml-[10px] pb-[20px]">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/productlist")}
                    >
                      Discard
                    </Button>
                    <Button
                      variant="outline"
                      type="submit"
                      className="bg-green-400"
                    >
                      Save
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
};

export default EditProduct;
