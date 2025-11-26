import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getAllCustomers } from '../../features/customerManagement/customerSlice';
import {DataTable} from './DataTable';
import {useCustomerColumns } from './Columns';

const CustomerList = () => {
  const [data,setData]=useState([]);
  const dispatch=useDispatch();
  const columns = useCustomerColumns();


  const fetchCustomers=async()=>{
    try {
      const res=await dispatch(getAllCustomers());
      // console.log("fetchCustomers Response:- ",res.payload);
      
      setData(res.payload);  

    } catch (error) {
      console.log("Error in fetchCustomers function:- ",error);      
    }
  }

  //effect function will run only once when we refresh the page.
  useEffect(()=>{
    fetchCustomers();
  },[])

  // console.log("Data:- ",data);

  return (
    <div className='p-6 border rounded-2xl'>
      <h1 className='text-2xl font-semibold'>Customers</h1>

      <DataTable columns={columns} data={data}/>
    </div>
  )
}

export default CustomerList