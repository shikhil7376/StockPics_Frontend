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
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onOpenChange, item, onDelete }) => {
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
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Details</ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col items-center gap-3'>
                                    <input
                                        type="file"
                                        disabled={!isEditing}
                                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                    />
                                    {selectedFile ? (
                                        <img src={URL.createObjectURL(selectedFile)} className="h-[150px] w-[150px]" alt="Preview" />
                                    ) : (
                                        <img src={item.url} className="h-[150px] w-[150px]" alt="Uploaded" />
                                    )}
                                    <div className='flex flex-col'>
                                        <Textarea
                                            className="w-[300px] "
                                            label="Description"
                                            placeholder="Enter your description"
                                            value={editedDescription}
                                              disabled={!isEditing}
                                          onChange={(e) => setEditedDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {isUploading ? (
                                    <Spinner />
                                ) : isEditing ? (
                                    <Button onClick={handleSave}>Save</Button>
                                ) : (
                                    <FaEdit size={25} onClick={() => setIsEditing(true)} />
                                )}
                                {isLoading ? (<><Spinner /></>) : (<MdDelete size={25} onClick={handleDelete} />)}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default DetailModal