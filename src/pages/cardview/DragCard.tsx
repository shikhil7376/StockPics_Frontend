import React from 'react';
import { Image } from "@nextui-org/react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getDataTypes } from '../../interface/dataTypes';

interface DragCardProps{
    id:string;
    item:getDataTypes;
    onImageClick: (item: getDataTypes) => void;
}

const DragCard: React.FC<DragCardProps> = ({ id, item,onImageClick }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <Image
                isZoomed
                alt="NextUI Fruit Image with Zoom"
                src={item.url}
                style={{ height: '235px', width: '200px' }}
                onClick={() => onImageClick(item)} 
            />
        </div>
    );
};

export default DragCard;
