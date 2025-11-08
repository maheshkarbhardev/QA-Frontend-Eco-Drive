import axiosInstance from "../../api/axiosInstance";

//get all customers
export const getAllCustomersAPI = async () => {
  const res = await axiosInstance.get("/customer/getAllCustomers");
  // console.log("getAllCustomersAPI :- ", res.data); //res.data looks like postman response
  return res.data;
};
