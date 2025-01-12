import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { getDataTypes } from '../../interface/dataTypes';
import { Textarea } from '@nextui-org/react';
import { useState,useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Spinner from '../ui/spinner';
import axios from 'axios';

interface DetailModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    item: getDataTypes;
    onDelete: (id: string) => void;
    onUpdate: (updatedItem: getDataTypes) => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onOpenChange, item, onDelete,onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedDescription, setEditedDescription] = useState(item.description)
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (!isOpen) {
          setSelectedFile(null); // Reset selected file when modal closes
          setIsEditing(false); // Reset editing state
          setEditedDescription(item.description); // Reset description to original value
        }
      }, [isOpen, item.description]);


    const handleDelete = async () => {
        setIsLoading(true);
        try {
            onDelete(item.id)
            onOpenChange(false)
        } catch (error) {

        } finally {
            setIsLoading(false);
        }

    }

    const uploadToCloudinary = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "stock_pics");  // Replace with your preset    
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dororvabe/image/upload`,
                formData
              );
   
          if (response?.data.secure_url) {
            return response?.data.secure_url;
          }
        } catch (error) {
          console.error("Cloudinary upload failed:", error);
        }
        return null;
      };

    const handleSave = async()=>{
        let uploadedImageUrl = null;
        if (selectedFile) {
            setIsUploading(true);
            uploadedImageUrl = await uploadToCloudinary(selectedFile);
            setIsUploading(false);
          }
          const updatedFields: Partial<getDataTypes> = {};
          if (editedDescription !== item.description) {
            updatedFields.description = editedDescription;
          }
          if (uploadedImageUrl) {
            updatedFields.url = uploadedImageUrl;
          }
          if (Object.keys(updatedFields).length > 0) {
            const updatedItem = { ...item, ...updatedFields };
            onUpdate(updatedItem); // Use the onUpdate prop to update the item
        }
        onOpenChange(false);
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Details</ModalHeader>
            <ModalBody >
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-[150px] w-[150px] border border-gray-300 rounded-md">
                  {isUploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                      <Spinner />
                    </div>
                  ) : selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      className="h-full w-full object-cover rounded-md"
                      alt="Preview"
                    />
                  ) : (
                    <img
                      src={item.url}
                      className="h-full w-full object-cover rounded-md"
                      alt="Uploaded"
                    />
                  )}
                </div>
                <input
                  type="file"
                  disabled={!isEditing}
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="mt-2  w-[400px] overflow-hide "
                />
                <Textarea
                  className="w-[300px]"
                  label="Description"
                  placeholder="Enter your description"
                  value={editedDescription}
                  disabled={!isEditing}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              {isEditing ? (
                <Button onClick={handleSave} isDisabled={isUploading}>
                  Save
                </Button>
              ) : (
                <FaEdit size={25} onClick={() => setIsEditing(true)} />
              )}
              {isLoading ? (
                <Spinner />
              ) : (
                <MdDelete size={25} onClick={handleDelete} />
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    )
}

export default DetailModal
