import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { DataTable } from './DataTable';
import { Columns } from './Columns';

const ProductList = () => {
  const [data,setData]=useState([]); //Create a state variable data to store the list of products fetched from the API.
  
  useEffect(()=>{
    const fetchProducts=async()=>{
      try {
          const res=await axiosInstance.get('/product/getAllProducts');
          console.log("fetch product api call :- ",res.data.data);
          
          setData(res.data.data);  //Updates data with the list of products returned by the API.
      } catch (err) {
        console.log("Error fetching products: ",err);        
      }
    }
    fetchProducts()
  },[])


  return (
    <div className='p-6 border rounded-2xl'>
        <h1 className='text-2xl font-semibold'>Products</h1>
        <DataTable columns={Columns} data={data}/>
        {/* columns → the configuration (from Columns.jsx) , data → the array of products fetched from API. */}
    </div>
  )
}

export default ProductList