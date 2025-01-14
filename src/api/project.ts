import {uploadDataTypes } from "../interface/dataTypes";
import api from "../services/axios";
import errorHandle from "./error";
import { getDataTypes } from "../interface/dataTypes";

export const uploadData = async(data:uploadDataTypes[])=>{
    try {
        const response = await api.post('/project/upload',data)
        return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
}

export const getData = async (id: string, page: number = 1, limit: number = 10) => {
    try {
        const response = await api.get(`/project/getData?userid=${id}&page=${page}&limit=${limit}`);
        return response.data;  // returning the response data including pagination info
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err); // Handle error if any
    }
};

export const deleteData = async( id:string, userid:string )=>{
    try {        
       const response = await api.delete(`/project/deleteData/${id}/${userid}`) 
       return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err); 
    }
}

export const updateData = async(updatedFields:getDataTypes)=>{
     try {
        const response = await api.put(`/project/update`,updatedFields)
        return response
     } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err); 
     }
}

export const updateImageOrder = async (reorderedData: getDataTypes[]) => {
    try {
        const response = await api.put(`/project/update-image-order`, { reorderedData });
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
};