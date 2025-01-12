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

export const getData = async(id:string)=>{
    try {  
        const response = await api.get(`/project/getData?userid=${id}`)
        return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
}

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