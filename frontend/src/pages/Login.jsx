import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCircleUser } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const galleryInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const switchToLogin = () => {
    setIsLogin(true);
    setShowImageOptions(false);
    setShowCameraModal(false);
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAvatar(URL.createObjectURL(file));
    setShowImageOptions(false);
    event.target.value = '';
  };

  const openGalleryPicker = () => {
    galleryInputRef.current?.click();
  };

  const stopCameraStream = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const closeCameraModal = () => {
    stopCameraStream();
    setShowCameraModal(false);
  };

  const openCameraPicker = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error('Camera is not supported in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });

      setCameraStream(stream);
      setShowCameraModal(true);
      setShowImageOptions(false);
    } catch (error) {
      toast.error('Unable to access camera. Please allow camera permission.');
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      setAvatar(URL.createObjectURL(blob));
      closeCameraModal();
    }, 'image/jpeg', 0.95);
  };

  useEffect(() => {
    if (showCameraModal && cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [showCameraModal, cameraStream]);

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-sky-950 to-cyan-900 p-3 sm:p-4 fade-in">
      <div className={`w-full rounded-3xl border border-white/20 bg-white/12 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-cyan-950/40 sm:p-5 md:p-6 ${isLogin ? 'max-w-xs sm:max-w-sm' : 'max-w-md sm:max-w-lg'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>
        {isLogin ? (
          <div>
            <h2 className="mb-2 text-center text-2xl font-bold tracking-tight text-white">Welcome Back</h2>
            <p className="mb-4 text-center text-xs text-slate-200">Sign in to your account</p>

            <form onSubmit={handleLoginSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="w-full rounded-2xl border border-white/20 bg-white/90 px-3 py-2.5 text-xs text-slate-800 shadow-lg shadow-slate-950/5 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-300/35 hover:border-cyan-200 hover:bg-white sm:px-4 sm:text-sm"
                  placeholder="Username*"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2">
                <input
                  type="password"
                  className="w-full rounded-2xl border border-white/20 bg-white/90 px-3 py-2.5 text-xs text-slate-800 shadow-lg shadow-slate-950/5 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-300/35 hover:border-cyan-200 hover:bg-white sm:px-4 sm:text-sm"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-right mb-3">
                <div
                  className="cursor-pointer text-xs font-medium text-cyan-100 transition duration-200 hover:text-white"
                  onClick={() => alert('Forgot password functionality coming soon!')}
                >
                  Forgot Password?
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-300 hover:via-sky-400 hover:to-blue-500 hover:shadow-xl hover:shadow-cyan-950/40 active:scale-[0.99]"
              >
                Sign In
              </button>
            </form>

            <div className="mt-3 flex items-center justify-center gap-1 text-center text-xs text-slate-200">
              Don't have an account?{' '}
              <div
                onClick={switchToRegister}
                className="cursor-pointer font-medium text-cyan-200 transition duration-200 hover:text-white"
              >
                Sign up here
              </div>
            </div>
          </div>
        ) : (
          <div >
            <h2 className="mb-2 text-center text-2xl font-bold tracking-tight text-white">Create Account</h2>
            <p className="mb-3 text-center text-xs text-slate-200">Join us today</p>

            <form onSubmit={handleRegisterSubmit} >

              {/* Avatar Upload */}
              <div className="mb-3 flex flex-col items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowImageOptions((prev) => !prev)}
                  className="relative group cursor-pointer"
                >
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white/70 bg-gradient-to-br from-white to-cyan-100 text-slate-500 shadow-xl shadow-slate-950/10 ring-4 ring-cyan-200/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-cyan-950/20 sm:h-24 sm:w-24">
                    {avatar ? (
                      <img src={avatar} alt="avatar preview" className="w-full h-full object-contain bg-gray-100" />
                    ) :  
                    (
                      <FaCircleUser size={92} />
                    )}
                  </div>

                  <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:from-cyan-300 group-hover:to-blue-500">
                    <FaCamera size={12} />
                  </div>
                </button>

                <p className="text-[11px] text-cyan-100">Add profile photo</p>

                {showImageOptions && (
                  <div onClick={e=>e.stopPropagation()} className="grid w-full max-w-xs grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-slate-900/35 p-2 backdrop-blur-md">
                    <button
                      type="button"
                      onClick={openGalleryPicker}
                      className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-white/18 hover:shadow-lg hover:shadow-slate-950/10 cursor-pointer"
                    >
                      Gallery
                    </button>

                    <button
                      type="button"
                      onClick={openCameraPicker}
                      className="rounded-xl border border-cyan-300/35 bg-gradient-to-r from-cyan-400/85 to-blue-500/85 px-3 py-2 text-xs font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:from-cyan-300 hover:to-blue-400 hover:shadow-lg hover:shadow-cyan-950/20 cursor-pointer"
                    >
                      Camera
                    </button>
                  </div>
                )}

                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="mb-2.5">
                <input
                  type="text"
                  className="w-full rounded-2xl border border-white/20 bg-white/90 px-3 py-2.5 text-xs text-slate-800 shadow-lg shadow-slate-950/5 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-300/35 hover:border-cyan-200 hover:bg-white sm:px-4 sm:text-sm"
                  placeholder="Full Name*"
                    value={fullName}  
                    onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2.5">
                <input
                  type="text"
                  className="w-full rounded-2xl border border-white/20 bg-white/90 px-3 py-2.5 text-xs text-slate-800 shadow-lg shadow-slate-950/5 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-300/35 hover:border-cyan-200 hover:bg-white sm:px-4 sm:text-sm"
                  placeholder="Username*"
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2.5">
                <input
                  type="email"
                  className="w-full rounded-2xl border border-white/20 bg-white/90 px-3 py-2.5 text-xs text-slate-800 shadow-lg shadow-slate-950/5 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-300/35 hover:border-cyan-200 hover:bg-white sm:px-4 sm:text-sm"
                  placeholder="Email Address*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-2.5">
                <textarea
                  className="w-full resize-none rounded-2xl border border-white/20 bg-white/90 px-3 py-2 text-xs text-slate-800 shadow-lg shadow-slate-950/5 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-300/35 hover:border-cyan-200 hover:bg-white sm:px-4 sm:text-sm"
                  placeholder="Bio*"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                  rows="1"
                />
              </div>

              <div className="mb-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <input
                  type="password"
                  className="w-full rounded-2xl border border-white/20 bg-white/90 px-3 py-2.5 text-xs text-slate-800 shadow-lg shadow-slate-950/5 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-300/35 hover:border-cyan-200 hover:bg-white sm:px-4 sm:text-sm"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <input
                  type="password"
                  className="w-full rounded-2xl border border-white/20 bg-white/90 px-3 py-2.5 text-xs text-slate-800 shadow-lg shadow-slate-950/5 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-300/35 hover:border-cyan-200 hover:bg-white sm:px-4 sm:text-sm"
                  placeholder="Confirm Password*"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-300 hover:via-sky-400 hover:to-blue-500 hover:shadow-xl hover:shadow-cyan-950/40 active:scale-[0.99]"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-3 flex items-center justify-center gap-1 text-center text-xs text-slate-200">
              Already have an account?{' '}
              <div
                onClick={switchToLogin}
                className="cursor-pointer font-medium text-cyan-200 transition duration-200 hover:text-white"
              >
                Sign in here
              </div>
            </div>

            {showCameraModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
                <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-slate-900/90 p-4 shadow-2xl shadow-slate-950/40">
                  <h3 className="text-center text-lg font-semibold text-white">Take Profile Photo</h3>
                  <p className="mt-1 text-center text-xs text-slate-300">Position your face and capture a live photo.</p>

                  <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="h-72 w-full object-cover"
                    />
                  </div>

                  <canvas ref={canvasRef} className="hidden" />

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={closeCameraModal}
                      className="rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/15"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:from-cyan-300 hover:via-sky-400 hover:to-blue-500"
                    >
                      Capture
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
