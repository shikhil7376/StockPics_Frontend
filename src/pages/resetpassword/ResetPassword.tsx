import React, { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resendOtp, resetOtp, otpVerify } from '../../api/user';
import { motion } from 'framer-motion';
import { InputOtp } from '@nextui-org/input-otp';
import errorHandle from '../../api/error';

const ResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1); // 1: Request OTP, 2: Verify OTP
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    setLoading(true);
    try {
      const response = await resetOtp(email);
      if (response?.data.success) {
        toast.success('OTP sent to your email!');
        setStep(2); // Move to OTP verification step
        const currentTime = Math.floor(Date.now() / 1000);
        localStorage.setItem('otpStartTime', currentTime.toString());
        setTimer(120);
      } else {
        toast.error('Error sending OTP. Please try again.');
      }
    } catch (error) {
        if (error instanceof Error) {
            errorHandle(error); // Handle standard Error objects
          } else {
            console.error("Unexpected error:", error); // Log non-standard errors
            errorHandle(new Error("An unexpected error occurred."));
          }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const startTime = localStorage.getItem('otpStartTime');
    const currentTime = Math.floor(Date.now() / 1000);

    if (startTime) {
      const elapsedTime = currentTime - parseInt(startTime, 10);
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

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer <= 0) {
            clearInterval(interval);
            setIsResendEnabled(true);
            return 0;
          }
          return newTimer;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleButtonClick = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isResendEnabled) {
      try {
        const response = await resendOtp(email);
        if (response?.data.success) {
          toast.success(response.data.message);
          const currentTime = Math.floor(Date.now() / 1000);
          localStorage.setItem('otpStartTime', currentTime.toString());
          setTimer(120);
          setIsResendEnabled(false);
        }
      } catch (error) {
        if (error instanceof Error) {
            errorHandle(error); // Handle standard Error objects
          } else {
            console.error("Unexpected error:", error); // Log non-standard errors
            errorHandle(new Error("An unexpected error occurred."));
          }
      }
    } else {
      try {
        const response = await otpVerify(parseInt(otp, 10));
        if (response?.data.success) {
          toast.success(response.data.message);
          localStorage.removeItem('otpStartTime');
          navigate('/new-password',{state:{email:email}})
        } else {
          toast.error('Invalid OTP. Please try again.');
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient">
         {step === 1 ? (
      <div className="bg-white p-8 rounded-3xl shadow-lg w-[95%] sm:w-full max-w-md">
       
          <div>
            <h1 className="text-3xl font-semibold mb-8 text-left">Reset Password</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEmailSubmit();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2 font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-400 text-white font-semibold shadow-lg text-small px-6 py-2 rounded-full"
                  disabled={loading}
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </div>
            </form>
          </div>
          </div>
        ) : (
         
          <div className=' w-[450px]'>
            <motion.h2
              className="mt-6 text-center text-3xl text-gray-900 font-semibold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              OTP Verification
            </motion.h2>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center p-3">
                <p className="text-lg">
                  Time Remaining: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
                </p>
              </div>

              <motion.div
                className="space-y-4 flex flex-col items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <form onSubmit={handleButtonClick}>
                  <InputOtp
                    length={5}
                    onChange={(e) => setOtp((e.target as HTMLInputElement).value)}
                    autoFocus
                    aria-label="OTP Input"
                  />
                  <div className="mt-6 flex justify-center">
                    <button
                      type="submit"
                      className="bg-blue-400 text-white font-semibold shadow-lg text-small px-6 py-2 rounded-full"
                    >
                      {isResendEnabled ? 'Resend OTP' : 'Submit OTP'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
         
        )}
      </div>
    
  );
};

export default ResetPassword;
