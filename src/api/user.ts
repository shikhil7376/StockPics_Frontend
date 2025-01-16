import { signupTypes } from "../interface/dataTypes";
import api from "../services/axios";
import errorHandle from "./error";



export const signup = async (userData:signupTypes)=>{
    try {
        const response = await api.post('/user/sign-up',userData)            
        return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
}

export const otpVerify = async (code:number)=>{
    try { 
        const response = await api.patch('/user/verify',{code})
        return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
}

export const resendOtp = async(email:string)=>{
    try {
        const response = await api.patch('/user/resend',{email})
        return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
}

export const login = async(data:signupTypes)=>{
    try {
        const response = await api.post('/user/login',data)
        return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
}

export const resetOtp = async(email:string)=>{
    try {
        const response = await api.post('/user/resetotp',{email})
        return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
}

export const resetpassword = async(data:{email:string,password:string})=>{
    try {
        const response = await api.post('/user/resetpassword',{data})
        return response
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
    }
}