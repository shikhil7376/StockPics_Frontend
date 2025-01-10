import React from 'react'
import { motion } from "framer-motion";
import AuroraBackgroundDemo from '../../components/background/AuroraBackgroundDemo';
import ViewImages from '../viewImages/ViewImages';
import ImageUpload from '../uploadSection/ImageUpload';

const Dashboard = () => {
  return (
    <div className=''> 
          <AuroraBackgroundDemo/>  
          <ViewImages/>
          <ImageUpload/>
      </div>
  )
}

export default Dashboard
