import React from 'react';
import { InputOtp } from '@nextui-org/react';
import { motion } from 'framer-motion';

const Otp = () => {
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
              Time Remaining: <span className="text-red-500">02:00</span>
            </p>
          </div>

          {/* Input and Submit */}
          <motion.div
            className="space-y-4 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <form>
              {/* InputOtp */}
              <InputOtp
                length={6}
                onChange={(value) => console.log('OTP:', value)} // Capture OTP input
                autoFocus
                aria-label="OTP Input"
              />

              {/* Submit Button */}
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-400 text-white font-semibold shadow-lg text-small px-6 py-2 rounded-full"
                >
                  Submit OTP
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

