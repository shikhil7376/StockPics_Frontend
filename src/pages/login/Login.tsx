import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Ensure you're using React Router for navigation


const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-gradient">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-[95%] sm:w-full max-w-md">
        <motion.h1
          className="text-3xl font-semibold mb-8 md:ml-24 text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi, Welcome! 👋
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm mb-2 font-semibold"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm mb-2 font-semibold"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-400 text-white font-semibold shadow-lg text-small px-6 py-2 rounded-full"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </motion.div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 font-semibold">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
