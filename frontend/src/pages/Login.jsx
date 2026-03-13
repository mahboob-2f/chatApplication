import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCircleUser } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";


const Login = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    toast.success('User successfully registered! Now login with your credentials.');
    setIsLogin(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    toast.success('Login successful! Welcome back!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-2 fade-in">
      <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm transform transition-all duration-500 ease-out hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-500/15 border border-white/20 hover:border-blue-200/50 hover:bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        {isLogin ? (
          <div>
            <h2 className="text-xl font-bold mb-2 text-center text-gray-800">Welcome Back</h2>
            <p className="text-center text-xs text-gray-600 mb-3">Sign in to your account</p>

            <form onSubmit={handleLoginSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="w-full px-2 sm:px-3 py-2 border-gray-200 rounded-lg focus:outline-none transition-all duration-300 bg-gray-50/50 hover:border-gray-300 text-xs sm:text-sm  hover:ring-1 hover:ring-gray-300  border "
                  placeholder="Username*"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <input
                  type="password"
                  className="w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg focus:outline-none transition-all duration-300 bg-gray-50/50 hover:border-gray-300 text-xs sm:text-sm hover:ring-1 hover:ring-gray-300  "
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-right mb-3">
                <div
                  className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 text-xs cursor-pointer outline-0 border-0"
                  onClick={() => alert('Forgot password functionality coming soon!')}
                >
                  Forgot Password?
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md hover:shadow-blue-500/25 cursor-pointer active:scale-[0.99] text-sm"
              >
                Sign In
              </button>
            </form>

            <p className="mt-2 text-center text-gray-600 flex justify-center items-center gap-1 text-xs">
              Don't have an account?{' '}
              <div
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 cursor-pointer"
              >
                Sign up here
              </div>
            </p>
          </div>
        ) : (
          <div className="max-h-[90vh] overflow-y-auto overflow-x-hidden">
            <h2 className="text-xl font-bold mb-2 text-center text-gray-800">Create Account</h2>
            <p className="text-center text-xs text-gray-600 mb-3">Join us today</p>

            <form onSubmit={handleRegisterSubmit}>

              {/* Avatar Upload */}
              <div className="mb-4 flex justify-center">
                <label htmlFor="avatar-upload" className="relative group cursor-pointer">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md ring-2 ring-gray-200  group-hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {avatar ? (
                      <img src={avatar} alt="avatar preview" className="w-full h-full object-contain bg-gray-100" />
                    ) :  
                    (
                      <FaCircleUser size={110} />
                    )}
                  </div>

                  <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md border-2 border-white group-hover:bg-blue-700 transition-all duration-300">
                    <FaCamera size={14} />
                  </div>

                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setAvatar(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null)}
                    onChangeCapture={(e) => setAvatar(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null)}
                  />
                </label>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg focus:outline-none transition-all duration-300 bg-gray-50/50 text-xs sm:text-sm outline-0"
                  placeholder="Full Name*"
                    value={fullName}  
                    onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg focus:outline-none transition-all duration-300 bg-gray-50/50 hover:border-gray-300 text-xs sm:text-sm"
                  placeholder="Username*"
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg focus:outline-none transition-all duration-300 bg-gray-50/50 hover:border-gray-300 text-xs sm:text-sm"
                  placeholder="Email Address*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <textarea
                  className="w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg focus:outline-none transition-all duration-300 bg-gray-50/50 hover:border-gray-300 text-xs sm:text-sm resize-none"
                  placeholder="Bio*"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                  rows="1"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <input
                  type="password"
                  className="w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg focus:outline-none transition-all duration-300 bg-gray-50/50 hover:border-gray-300 text-xs sm:text-sm"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <input
                  type="password"
                  className="w-full px-2 sm:px-3 py-2 border border-gray-200 rounded-lg focus:outline-none transition-all duration-300 bg-gray-50/50 hover:border-gray-300 text-xs sm:text-sm"
                  placeholder="Confirm Password*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.01] hover:shadow-md hover:shadow-blue-500/25 cursor-pointer active:scale-[0.99] text-sm"
              >
                Sign Up
              </button>
            </form>

            <p className="mt-2 text-center text-gray-600 flex justify-center items-center gap-1 text-xs">
              Already have an account?{' '}
              <div
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 cursor-pointer"
              >
                Sign in here
              </div>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;