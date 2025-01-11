import React, { useState } from 'react'
import AuroraBackgroundDemo from '../../components/background/AuroraBackgroundDemo';
import ViewImages from '../viewImages/ViewImages';
import ImageUpload from '../uploadSection/ImageUpload';
import { uploadDataTypes } from '../../interface/dataTypes';
import { getData } from '../../api/project';
import errorHandle from '../../api/error';
import { useEffect } from 'react';

const Dashboard = () => {
  const [data, setData] = useState<uploadDataTypes[]>([]); // State typed with array of uploadDataTypes
  console.log('data',data);
  

  useEffect(()=>{
    getUserData()
  },[])

 const getUserData = async()=>{
    try {
      const response = await getData()
      if (response && response.data) {
        console.log('response', response.data); // Log the response for debugging
        setData(response.data); // Store the response data in the state
      }
       
    } catch (error) {
      if (error instanceof Error) {
        errorHandle(error); // Handle standard Error objects
      } else {
        console.error("Unexpected error:", error); // Log non-standard errors
        errorHandle(new Error("An unexpected error occurred."));
      } 
    }     
 }
  return (
    <div className=''> 
          <AuroraBackgroundDemo/>  
          {data.length > 0 && <ViewImages data={data} />}
          <ImageUpload  setData= {setData}/>
      </div>
  )
}

export default Dashboard
