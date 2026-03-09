import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Simulate registration
    toast.success('User successfully registered! Now login with your credentials.');
    setIsLogin(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    toast.success('Login successful! Welcome back!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 fade-in">
      <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:max-w-lg transform transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 border border-white/20 hover:border-blue-200/50 hover:bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        {isLogin ? (
          // Login Form
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Welcome Back</h2>
            <p className="text-center text-gray-600 mb-4">Sign in to your account</p>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Username</label>
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 focus:bg-white hover:border-gray-300 text-sm sm:text-base"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-3 sm:px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 focus:bg-white hover:border-gray-300 text-sm sm:text-base"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="text-right mb-4 ">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 text-sm cursor-pointer outline-0 border-0"
                  onClick={() => alert('Forgot password functionality coming soon!')}
                >
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer active:scale-[0.98]"
              >
                Sign In
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 cursor-pointer"
              >
                Sign up here
              </button>
            </p>
          </div>
        ) : (
          // Register Form
          <div>
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Create Account</h2>
            <p className="text-center text-gray-600 mb-4">Join us today</p>
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Username</label>
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 focus:bg-white hover:border-gray-300 text-sm sm:text-base"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 sm:px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 focus:bg-white hover:border-gray-300 text-sm sm:text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2">Password</label>
                  <input
                    type="password"
                    className="w-full px-3 sm:px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 focus:bg-white hover:border-gray-300 text-sm sm:text-base"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full px-3 sm:px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 focus:bg-white hover:border-gray-300 text-sm sm:text-base"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer active:scale-[0.98]"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 cursor-pointer"
              >
                Sign in here
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;