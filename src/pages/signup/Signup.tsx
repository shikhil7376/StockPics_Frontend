import React from 'react';
import { motion } from 'framer-motion';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-[95%] sm:w-full max-w-md">
        <motion.h2
          className="text-2xl text-gray-600 mb-6 text-center font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sign Up
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form>
            {/* Name Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                aria-label="Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                aria-label="Email"
                className="shadow appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                aria-label="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
            </div>

            {/* Mobile Number Input */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="phone"
              >
                Mobile Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                aria-label="Mobile Number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your mobile number"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-400 text-white font-semibold shadow-lg text-small px-6 py-2 rounded-full"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
