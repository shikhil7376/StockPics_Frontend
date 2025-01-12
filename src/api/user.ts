import { signupTypes,uploadDataTypes } from "../interface/dataTypes";
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

export const resetPasswordRequest = async (email: string) => {
     try {
       
        
        const response = await api.post(`/user/reset-password/request`, { email });
        return response;
     } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);
     }
  };

  export const verifyOTP = async (email: string, otp: string) => {
    try {
        const response = await api.post(`/api/reset-password/verify`, { email, otp });
        return response;
    } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err);  
    }
  };

  export const resetPassword = async (email: string, newPassword: string) => {
      try {
        const response = await api.post(`/api/reset-password/reset`, { email, newPassword });
        return response;
      } catch (error) {
        const err: Error = error as Error;
        return errorHandle(err); 
      }
  };