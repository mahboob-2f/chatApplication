import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HiOutlineArrowUpTray, HiOutlineTrash, HiOutlineXMark } from 'react-icons/hi2';
import { currentUser } from '../../constants/currentUser';

const PROFILE_IMAGE_STORAGE_KEY = 'connectify-profile-image';

const ProfileModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const savedImage = window.localStorage.getItem(PROFILE_IMAGE_STORAGE_KEY);
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const initials = useMemo(
    () =>
      currentUser.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    []
  );

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : null;
      if (!result) return;

      setProfileImage(result);
      window.localStorage.setItem(PROFILE_IMAGE_STORAGE_KEY, result);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    window.localStorage.removeItem(PROFILE_IMAGE_STORAGE_KEY);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-[4px]">
      <div
        className="flex h-[560px] w-full max-w-lg flex-col rounded-[24px] border border-white/70 bg-white/95 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="w-full">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              My Account
            </p>
            <h2 id="profile-title" className="mt-1.5 text-[2rem] font-semibold leading-none text-slate-800">
              Profile
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] border border-slate-200 bg-slate-50 text-lg text-slate-500 hover:bg-slate-100"
          >
            <HiOutlineXMark />
          </button>
        </div>

        <div className="mt-5 rounded-[24px] border border-slate-200/80 bg-[linear-gradient(145deg,rgba(240,249,255,0.95),rgba(255,255,255,0.98))] p-4 shadow-[0_8px_30px_rgba(148,163,184,0.10)]">
          <div className="flex flex-col items-center text-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt={currentUser.name}
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg shadow-slate-300/40"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 text-3xl font-semibold text-slate-950 shadow-lg shadow-cyan-950/15">
                {initials}
              </div>
            )}

            <h3 className="mt-3 text-lg font-semibold text-slate-800">{currentUser.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{currentUser.username}</p>
            <p className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
              {currentUser.status}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handlePickImage}
              className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(14,165,233,0.28)] hover:bg-sky-600"
            >
              <HiOutlineArrowUpTray className="text-base" />
              {profileImage ? 'Change' : 'Upload'}
            </button>

            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={!profileImage}
              className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] ${
                profileImage
                  ? 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'
                  : 'border-slate-200 bg-slate-100 text-slate-400'
              }`}
            >
              <HiOutlineTrash className="text-base" />
              Remove
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="mt-4 grid min-h-0 flex-1 gap-2.5">
          <article className="rounded-[20px] border border-slate-200/80 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(148,163,184,0.08)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Email
            </p>
            <p className="mt-1.5 text-sm text-slate-700">{currentUser.email}</p>
          </article>

          <article className="rounded-[20px] border border-slate-200/80 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(148,163,184,0.08)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Bio
            </p>
            <p className="mt-1.5 text-sm leading-6 text-slate-700">{currentUser.bio}</p>
          </article>

          <article className="rounded-[20px] border border-dashed border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Profile Photo
            </p>
            <p className="mt-1.5 text-sm text-slate-600">
              If no image is uploaded, your profile automatically shows your initials.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
