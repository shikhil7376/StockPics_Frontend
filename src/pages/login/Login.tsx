
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // Ensure you're using React Router for navigation
import validator from "validator";
import { signupTypes } from '../../interface/dataTypes';
import errorHandle from '../../api/error';
import { useState, FormEvent } from 'react';
import { login } from '../../api/user';
import { useDispatch } from 'react-redux';
import { setCredential } from '../../redux/slices/AuthSlice';
import toast from 'react-hot-toast';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<signupTypes>({});

  const validateForm = () => {
    const newErrors: signupTypes = {};
    if (!email.trim() || !validator.isEmail(email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must contain at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        const data = {
          email: email,
          password: password,
        };
        const response = await login(data)
        console.log('respu', response);

        if (response?.data) {
          localStorage.setItem("token", response.data.token)
          toast.success(response.data.message)
          dispatch(setCredential(response?.data?.userData))
          navigate('/')
        }
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
          <form onSubmit={submitHandler}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
              {errors.email && <p className="mt-2 text-sm font-semibold text-red-600">{errors.email}</p>}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.password && <p className="mt-2 text-sm font-semibold text-red-600">{errors.password}</p>}
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
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create one
            </Link>
          </p>
          <p className="text-sm text-gray-600 font-semibold">
            <Link
              to="/reset-password"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
