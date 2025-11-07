import axiosInstance from "../../api/axiosInstance";

export const signUpUserAPI=async(formData)=>{
    const res=await axiosInstance.post("/auth/signup",formData);
    console.log("signup response:-",res.data);    
    return res.data; //Returns res.data (the backend’s response body, e.g. { message: "Admin registered successfully." }).
}

export const signInUserAPI=async(formData)=>{
    const res=await axiosInstance.post("/auth/signin",formData);
    console.log("SignIn Response:- ",res.data);
    return res.data;   //return the object from backend with values like user object and token 
}