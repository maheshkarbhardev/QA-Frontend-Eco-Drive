import axiosInstance from "../../api/axiosInstance";

//Get all products
export const getAllProductsAPI =async()=>{
    const res=await axiosInstance.get("/product/getAllProducts");
    // console.log("getAllProductsAPI respose:",res.data);
    return res.data;    
}

//get all categories
export const getCategoriesAPI =async()=>{
    const res=await axiosInstance.get("/product/getCategories");
    // console.log("getCategoriesAPI response:-",res.data);
    return res.data;    
}

//get all usage units
export const getUsageUnitsAPI =async()=>{
    const res=await axiosInstance.get("/product/getUsageUnits");
    // console.log("getUsageUnitsAPI response:- ",res.data);
    return res.data;    
}

//Get product by ID
export const getProductByIdAPI = async (id) => {
  const res = await axiosInstance.get(`/product/getProductById/${id}`);
//   console.log("getProductByIdAPI response:", res.data);
  return res.data;
};

//add new products(with image uploading)
export const addProductAPI =async(formData)=>{
    const res=await axiosInstance.post("/product/addProduct",formData,{
        headers:{"Content-Type": "multipart/form-data"},
    });
    // console.log("Add Product Response:- ",res.data);
    return res.data;
};

//update product by Id
export const updateProductAPI =async({id,formData})=>{
    const res=await axiosInstance.put(`/product/updateProduct/${id}`,formData,{
        headers:{"Content-Type": "multipart/form-data"}
    });
    // console.log("Updated Product Response:- ",res.data);
    return res.data;    
};

//delete product by Id
export const deleteProductAPI =async(id)=>{
    const res=await axiosInstance.delete(`/product/deleteProduct/${id}`);
    // console.log("Delete Product Response:- ",res.data);
    return res.data;    
};




