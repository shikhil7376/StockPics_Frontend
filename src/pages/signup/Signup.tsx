import React, { FormEvent } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import errorHandle from "../../api/error";
import toast from "react-hot-toast";
import { signupTypes } from "../../interface/dataTypes";
import { data, useNavigate } from "react-router-dom";
import validator from "validator";
import { signup } from "../../api/user";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<signupTypes>({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newError: signupTypes = {};
    if (!name.trim()) {
      newError.name = "Name is required";
    }
    if (!email.trim() || !validator.isEmail(email)) {
      newError.email = "Valid email is required";
    }
    if (!phone.trim()) {
      newError.phone = "Phone is required";
    } else if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      newError.phone = "Phone number must contain 10 digits";
    }
    if (!password.trim()) {
      newError.password = "Password is required";
    } else if (password.length < 6) {
      newError.password = "Password must contain at least 6 characters";
    }
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return; // Stop submission if validation fails
    }

    try {
      const userData = {
        email,
        name,
        phone,
        password,
      };

      const response = await signup(userData); 
      console.log(response);
          
      if (response?.data) {
        toast.success(response.data.message);
        navigate("/Otp", {
          state: {
            email,
            name,
            password,
            phone,
          },
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        errorHandle(error); // Handle standard Error objects
      } else {
        console.error("Unexpected error:", error); // Log non-standard errors
        errorHandle(new Error("An unexpected error occurred."));
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-lg w-[95%] sm:w-full max-w-md">
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
          <form onSubmit={submitHandler}>
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
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-2 text-sm font-semibold text-red-600">{errors.name}</p>
              )}
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
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm font-semibold text-red-600">{errors.email}</p>
              )}
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
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-2 text-sm font-semibold text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Phone Input */}
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="phone"
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="shadow appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your mobile number"
              />
              {errors.phone && (
                <p className="mt-2 text-sm font-semibold text-red-600">{errors.phone}</p>
              )}
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
