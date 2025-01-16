import { useState, useEffect } from 'react';
import { getData } from '../../api/project';
import errorHandle from '../../api/error';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import DragCard from './DragCard';
import { getDataTypes } from '../../interface/dataTypes';
import DetailModal from '../../components/modal/Modal';
import { deleteData } from '../../api/project';
import { updateData, updateImageOrder } from '../../api/project';


const CardView = () => {
    const [data, setData] = useState<getDataTypes[]>([]);
    const [selectedItem, setSelectedItem] = useState<getDataTypes | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
    });

    console.log(pagination.currentPage);


    useEffect(() => {
        fetchUserData(pagination.currentPage);
    }, [pagination.currentPage]);

    const fetchUserData = async (page: number) => {
        try {
            const response = await getData( page, 8);
            if (response && response.data) {
                setData(response.data);
                setPagination({
                    currentPage: response.pagination.currentPage,
                    totalPages: response.pagination.totalPages,
                    totalCount: response.pagination.totalCount,
                });
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
    const getTaskPos = (id: string) => data.findIndex(data => data.id === id);

    // Handle drag end and update data state
    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        // If the item is dropped in the same position, no need to update
        if (active.id === over.id) return;

        setData((data) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);
            const updatedData = arrayMove(data, originalPos, newPos);
            updateImageOrder(updatedData).then((response) => {
                if (response?.data?.success) {
                    console.log("Order saved successfully!");
                }
            });
            return updatedData;
            // return arrayMove(data, originalPos, newPos); 
        });
    };

    const handleImageClick = (item: getDataTypes) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await deleteData(id)
            if (response?.data.success) {
                setData((prevItems) => prevItems.filter(item => item.id !== id))
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

    const handleUpdate = async (updatedItem: getDataTypes) => {
        try {
            const response = await updateData(updatedItem)
            if (response?.data.success) {
                setData((prevItems) =>
                    prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
                );
            }

        } catch (error) {
            console.error("Unexpected error:", error); // Log non-standard errors
            errorHandle(new Error("An unexpected error occurred."));
        }

    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination((prev) => ({ ...prev, currentPage: newPage }));
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 p-3'>
                    <SortableContext items={data} strategy={verticalListSortingStrategy}>
                        {data.map((item) => (
                            <DragCard id={item.id} item={item}  key={item.id} onImageClick={handleImageClick} />
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

            <div className="pagination-controls flex gap-4">
                <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className={`px-4 py-2  font-semibold text-xl bg-gray-300 text-white rounded-full hover:bg-gray-400 focus:outline-none ${pagination.currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    {"<"}
                </button>

                <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className={`px-4 py-2 font-semibold text-xl bg-gray-300 text-white rounded-full hover:bg-gray-400 focus:outline-none ${pagination.currentPage === pagination.totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    {">"}
                </button>

            </div>
        </div>
    );
};

export default CardView;
