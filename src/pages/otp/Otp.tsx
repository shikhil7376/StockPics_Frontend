import { FormEvent } from 'react';
import { InputOtp } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { otpVerify, resendOtp } from '../../api/user';
import toast from 'react-hot-toast';
import errorHandle from '../../api/error';

const Otp = () => {
  const [otp,setOtp] = useState<string>('')
  const [timer,setTimer] = useState<number>(0)
  const [isResendEnabled,setIsResendEnabled] = useState<boolean>(false)

  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state

  let resendEmail:string
   if(data){
      resendEmail = data.email
   }

  useEffect(() => {
    const startTime = localStorage.getItem('otpStartTime');
    const currentTime = Math.floor(Date.now() / 1000);

    if (startTime) {
      const elapsedTime = currentTime - parseInt(startTime);
      const remainingTime = 120 - elapsedTime;
      if (remainingTime > 0) {
        setTimer(remainingTime);
        setIsResendEnabled(false);
      } else {
        setTimer(0);
        setIsResendEnabled(true);
      }
    } else {
      setTimer(120);
      localStorage.setItem('otpStartTime', currentTime.toString());
    }
  }, []);

  useEffect(()=>{
    if(timer>0){
      const intreval = setInterval(()=>{
         setTimer(prevTimer =>{
           const newTimer = prevTimer -1
           if(newTimer <=0){
             clearInterval(intreval)
             setIsResendEnabled(true)
             return 0
           }
           return newTimer
         })
      },1000)
      return () => clearInterval(intreval);
    }
 },[timer])


  const handleButtonClick = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if(isResendEnabled){
          try {
            const response = await resendOtp(resendEmail)
            if(response){
              toast.success(response.data.message)
              const currentTime = Math.floor(Date.now()/1000)
                localStorage.setItem('otpStartTime',currentTime.toString())
                setTimer(120)
                setIsResendEnabled(false)
            }
          } catch (error) {
            if (error instanceof Error) {
              errorHandle(error); // Handle standard Error objects
            } else {
              console.error("Unexpected error:", error); // Log non-standard errors
              errorHandle(new Error("An unexpected error occurred."));
            }
          }
        }else{
          try {
             const response = await otpVerify(parseInt(otp))
             if(response){
              toast.success(response.data.message)
              localStorage.removeItem('otpStartTime')
              navigate('/login')
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

  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-custom-gradient">
      <div className="max-w-md w-full space-y-8">
        {/* Header Section */}
        <div>
          <motion.h2
            className="mt-6 text-center text-3xl text-gray-900 font-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            OTP VERIFICATION
          </motion.h2>
        </div>

        {/* OTP Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Timer */}
          <div className="flex justify-center p-3">
            <p className="text-lg font-medium text-gray-700">
            <p className='text-lg'>Time Remaining: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</p>
            </p>
          </div>

          {/* Input and Submit */}
          <motion.div
            className="space-y-4 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <form onSubmit={handleButtonClick}>
              {/* InputOtp */}
              <InputOtp
                length={5}
                onChange={(e) => setOtp((e.target as HTMLInputElement).value)}
                autoFocus
                aria-label="OTP Input"
               
              />

              {/* Submit Button */}
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-400 text-white font-semibold shadow-lg text-small px-6 py-2 rounded-full"
                >
                 {isResendEnabled?'RESEND OTP':'SUBMIT OTP'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Otp;

