import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      
      <div className="text-center bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20 max-w-md w-full">

        <h1 className="text-7xl font-extrabold text-blue-600 mb-2">
          404
        </h1>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-600 text-sm mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-blue-500/30 active:scale-[0.98]"
        >
          Go Back Home
        </button>

      </div>

    </div>
  );
};

export default NotFound;