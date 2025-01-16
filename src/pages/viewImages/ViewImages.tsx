import React from 'react'
import { AnimatedTestimonials } from '../../components/ui/animated-testimonials'
import { uploadDataTypes } from '../../interface/dataTypes';

interface ViewImagesProps {
  data: uploadDataTypes[];
}

const ViewImages: React.FC<ViewImagesProps> = ({data}) => {
  
  return <AnimatedTestimonials testimonials={data} />;
}

export default ViewImages
