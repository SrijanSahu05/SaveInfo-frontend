import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { TriangleAlert } from 'lucide-react';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      if(password !== confirmPassword){
        setError("Password not match");
        return;
      }

      setLoading(true);

      try{
        const response = await api.post('/auth/SignUp', {
          name,
          email,
          password,
        });

        toast.success("Account created successfully!");
        //console.log("User registered: ", response.data);

        localStorage.setItem("userInfo", JSON.stringify(response.data));
        
        setLoading(false);
        navigate("/SaveInfo.com");
      } catch (error) {
        setLoading(false);
        setError(error.response?.data?.message || 'Registration failed');
        if(error.response.status === 429){
          toast.error("Slow down! Rate limit reached try again later.",{
          duration: 4000,
        });
        } else {
          toast.error("Registrtion failed");
        }
      }
    };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 p-6">
      <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl border border-gray-700 p-10 md:p-14 shadow-2xl space-y-8 bg-gray-800 rounded-2xl">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {error && (
            <div className="col-span-full flex items-center p-3 text-sm text-red-200 bg-red-800 rounded-md">
              <TriangleAlert className="size-6 mr-2" />
              {error}
            </div>
          )}

          {/* Name */}
          <div className="col-span-full md:col-span-1">
            <label htmlFor="name" className="block text-lg font-medium text-gray-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 mt-1 text-gray-200 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="col-span-full md:col-span-1">
            <label htmlFor="email" className="block text-lg font-medium text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-1 text-gray-200 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="col-span-full md:col-span-1">
            <label htmlFor="password" className="block text-lg font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mt-1 text-gray-200 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="col-span-full md:col-span-1">
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 mt-1 text-gray-200 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-full">
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 text-lg font-semibold text-white bg-blue-600 rounded-md disabled:bg-gray-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-md text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/SaveInfo.com/auth/login"
            className="font-medium text-blue-400 hover:underline hover:text-blue-300"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;