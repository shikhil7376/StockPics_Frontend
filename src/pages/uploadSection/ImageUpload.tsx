import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Textarea, Button } from "@nextui-org/react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { uploadData } from '../../api/project';
import { uploadDataTypes } from '../../interface/dataTypes';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface FileWithPreview extends File {
  preview: string;
  description?: string;
}

const ImageUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const userdata = useSelector((state:RootState) => state.user.userdata);

  const navigate = useNavigate();

  const MAX_DESCRIPTION_LENGTH = 50;

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

  // Function to validate files' descriptions
  const validateFiles = (files: FileWithPreview[]) => {
    const filesWithMissingDescriptions = files.filter(
      (file) => !file.description || file.description.trim() === "" ||   file.description.length > MAX_DESCRIPTION_LENGTH
    );
    
    if (filesWithMissingDescriptions.length > 0) {
      setError(`Description must be between 1 and ${MAX_DESCRIPTION_LENGTH} characters.`);
      return false;  // Validation failed
    }
    setError("");  // Clear error message
    return true;  // Validation passed
  };

  const handleSubmit = async (validFiles: FileWithPreview[]) => {
    if(!userdata){
      toast.error("please login to upload files!!!!..")
      return
    }
    setIsUploading(true);
    try {
      const uploadedFiles:uploadDataTypes[] = await Promise.all(
        validFiles.map(async (file) => {
          const formData = new FormData();
          const rawFile = new File([file], file.name, { type: file.type });
          formData.append("file", rawFile);
          formData.append("upload_preset", "stock_pics"); // Cloudinary preset
          // Upload to Cloudinary
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dororvabe/image/upload`,
            formData
          );

          return {
            url: response.data.secure_url || "",
            description: file.description || "",
            userid:userdata?._id || ""
          };
        })
      );

       if(uploadedFiles && uploadedFiles.length > 0){
           const updateResponse = await uploadData(uploadedFiles)
           if(updateResponse){
            
            toast.success("upload succesfully")
            navigate('/view')
            setFiles([]); 
           }
       }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  // Call validation and then submit
  const onSubmit = () => {
    if (validateFiles(files)) {
      handleSubmit(files); // Only call handleSubmit if validation passed
    }
  };

  const thumbs = files.map((file, index) => (
    <div key={index} className=' p-1'>
      <div className="flex gap-3">
        <img src={file.preview} className="w-[100px] h-[100px] rounded-lg" onLoad={() => { URL.revokeObjectURL(file.preview) }} />
        <div className='h-[100px] w-[400px] '>
          <Textarea
            className="h-full overflow-y-auto scrollbar-hide"
            label="Description"
            placeholder="Enter your description"
            value={file.description}
            onChange={(e) => {
              const updatedFiles = [...files];
              updatedFiles[index].description = e.target.value;
              setFiles(updatedFiles);
            }} // Update description state
          />
         <p className="text-xs text-gray-500">
            {file.description?.length}/{MAX_DESCRIPTION_LENGTH} characters
          </p>
          {!file.description?.trim() && error && (
            <p className="text-red-500 text-sm text-center">All Description is required.</p>
          )}
         {file.description && file.description.length > MAX_DESCRIPTION_LENGTH && (
          <p className="text-red-500 text-sm text-center">
           Description exceeds the maximum length of {MAX_DESCRIPTION_LENGTH} characters.
              </p>
             )}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex justify-center">
      <section className="container p-5 flex flex-col justify-center items-center w-[80%] h-[450px] border-dashed border-1 border-sky-500">
        <div {...getRootProps({ className: 'dropzone' })} className="w-full flex items-center justify-between p-4">
          <input {...getInputProps()} />
          <p className="font-semibold text-center flex-grow">Drag 'n' drop or Click Here..</p>
          <Button
            onClick={onSubmit}
            className="bg-blue-400 text-white font-semibold"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Submit"}
          </Button>
        </div>
        <div className="h-[400px] overflow-y-scroll scrollbar-hide p-3 flex flex-col gap-3 ">
          {thumbs}
        </div>
      </section>
    </div>
  );
};

export default ImageUpload;
