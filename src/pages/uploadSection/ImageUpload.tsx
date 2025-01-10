import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {Textarea,Button} from "@nextui-org/react";
import axios from 'axios';

interface FileWithPreview extends File {
  preview: string;
  description?:string;
}

const ImageUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles((prev) => [
        ...prev,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            description: "", // Initialize description as empty
          })
        ),
      ]);
    },
  });

  // Update description for a specific file
  const updateDescription = (index: number, value: string) => {
    setFiles((prev) =>
      prev.map((file, idx) =>
        idx === index ? { ...file, description: value } : file
      )
    );
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    try {
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {            
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "stock_pics"); // Replace with your Cloudinary preset
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dororvabe/image/upload`, // Replace with your Cloudinary cloud name
            formData
          );
          return {
            url: response.data.secure_url,
            description: file.description,
          };
        })
      );
     
      console.log('uploadimage',uploadedFiles);
      
      // Send data to your backend
    //   await axios.post("/api/upload", { images: uploadedFiles }); // Replace with your backend API endpoint

      alert("Upload successful!");
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

const thumbs = files.map((file,index)=>(
    <div key={index}>
     <div className='flex gap-3'>
        <img src={file.preview} className='w-[100px] h-[100px] rounded-lg'  onLoad={() => { URL.revokeObjectURL(file.preview) }}/>
        <div>
        <Textarea
            className="max-w-xs"
            label="Description"
            placeholder="Enter your description"
            value={file.description}
            onChange={(e) => updateDescription(index, e.target.value)} // Update description state
          />
        </div>
     </div>
    </div>
))

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className='flex justify-center'>
    <section className="container p-5  flex flex-col justify-center items-center w-[80%] h-[450px] border-dashed border-1 border-sky-500">
      <div {...getRootProps({ className: 'dropzone' })} className='w-full flex items-center justify-between p-4 '>
        <input {...getInputProps()} />
        <p className='font-semibold text-center flex-grow'>Drag 'n' drop  or Click Here..</p>
        <Button
          onClick={handleSubmit}
          className="bg-blue-400 text-white font-semibold"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Submit"}
        </Button>
      </div>
      {/* <aside style={thumbsContainer}>
        {thumbs}
      </aside> */}
      <div className='h-[400px] overflow-y-scroll scrollbar-hide p-3 flex flex-col gap-3 '>
      {thumbs}
      </div>
    </section>
    </div>
  );
};

export default ImageUpload;
