import React, { useState, useEffect } from 'react';
import { getData } from '../../api/project';
import errorHandle from '../../api/error';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import DragCard from './DragCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getDataTypes } from '../../interface/dataTypes';
import DetailModal from '../../components/modal/Modal';
import { deleteData } from '../../api/project';
import { updateData } from '../../api/project';


const CardView = () => {
    const [data, setData] = useState<getDataTypes[]>([]);    
  const userdata = useSelector((state: RootState) => state.user.userdata);
  const [selectedItem, setSelectedItem] = useState<getDataTypes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await getData(userdata?._id as string);
            if (response && response.data) {
                setData(response.data);
            }
        } catch (error) {
            if (error instanceof Error) {
                errorHandle(error);
            } else {
                errorHandle(new Error("An unexpected error occurred."));
            }
        }
    };

    // Function to get the index of the item based on its ID
    const getTaskPos = (id: string) => data.findIndex(task => task.id === id);

    // Handle drag end and update data state
    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        // If the item is dropped in the same position, no need to update
        if (active.id === over.id) return;

        setData((tasks) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);
            return arrayMove(tasks, originalPos, newPos); // Reorder the items
        });
    };

    const handleImageClick = (item: getDataTypes) => { 
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = async(id:string)=>{
        try {
            const response = await deleteData(id,userdata?._id as string)             
             if(response?.data.success){                
                setData((prevItems)=>prevItems.filter(item=>item.id !== id))
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

    const handleUpdate = async(updatedItem: getDataTypes) => { 
        try {
            const response = await updateData(updatedItem)
            if(response?.data.success){
                setData((prevItems) =>
                    prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
                );
            }

        } catch (error) {
              console.error("Unexpected error:", error); // Log non-standard errors
                errorHandle(new Error("An unexpected error occurred."));
        }       
      
    };

    return (
        <div className='flex flex-col items-center'>
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 p-3'>
                    <SortableContext items={data} strategy={verticalListSortingStrategy}>
                        {data.map((item) => (
                            <DragCard id={item.id} item = {item} setData={setData} key={item.id} onImageClick={handleImageClick}   />
                        ))}
                    </SortableContext>
                </div>
            </DndContext>
            {selectedItem && (
                <DetailModal
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    item={selectedItem}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default CardView;
