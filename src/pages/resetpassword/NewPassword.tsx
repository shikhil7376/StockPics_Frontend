import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import errorHandle from '../../api/error';
import { motion } from 'framer-motion';
import { Input,Button } from '@nextui-org/react';
import { resetpassword } from '../../api/user';

interface ErrorState {
    password?: string;
    confirmPassword?: string;
  }

const NewPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setErrors] = useState<ErrorState>({});
    const location = useLocation();
    const navigate = useNavigate();
  
    // Safely get email from location.state
    const emailPassed = location.state?.email || '';
  
    const data = {
      email: emailPassed,
      password: password
    };
  
    const validateForm = () => {
      const newError: ErrorState = {};
  
      if (!password.trim()) {
        newError.password = 'Password is required';
      } else if (password.length < 6) {
        newError.password = 'Password must contain at least 6 characters';
      }
      if (password !== confirmPassword) {
        newError.confirmPassword = 'Passwords do not match';
      }
      setErrors(newError);
      return Object.keys(newError).length === 0;
    };
  
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        try {
          const response = await resetpassword(data);
          if (response?.data.success) {
            toast.success(response.data.message);
            navigate('/login');
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-custom-gradient">
      <div className="max-w-md w-full space-y-8">
        <div>
          <motion.h2
            className="mt-6 text-center text-3xl text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            RESET PASSWORD
          </motion.h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <motion.div
            className="space-y-4 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <form onSubmit={submitHandler}>
              <div className='display flex flex-col gap-2'>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error.password && (
                  <p className="mt-2 text-sm text-red-600">{error.password}</p>
                )}
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{error.confirmPassword}</p>
                )}
              </div>

              <div className="mt-6 flex items-center justify-center">
                <Button
                  type='submit'
                  className="bg-blue-400 text-white font-semibold shadow-lg text-small px-6 py-2 rounded-full"
                >
                  SUBMIT
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NewPassword
