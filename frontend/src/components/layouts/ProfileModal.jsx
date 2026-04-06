import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  HiOutlineArrowUpTray,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { currentUser } from '../../constants/currentUser';

const PROFILE_IMAGE_STORAGE_KEY = 'connectify-profile-image';
const PROFILE_DETAILS_STORAGE_KEY = 'connectify-profile-details';

const ProfileModal = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileDetails, setProfileDetails] = useState(currentUser);
  const [draftProfile, setDraftProfile] = useState(currentUser);

  useEffect(() => {
    const savedImage = window.localStorage.getItem(PROFILE_IMAGE_STORAGE_KEY);
    const savedDetails = window.localStorage.getItem(PROFILE_DETAILS_STORAGE_KEY);

    if (savedImage) {
      setProfileImage(savedImage);
    }

    if (savedDetails) {
      const parsedDetails = JSON.parse(savedDetails);
      setProfileDetails(parsedDetails);
      setDraftProfile(parsedDetails);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      setDraftProfile(profileDetails);
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
      profileDetails.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    [profileDetails.name]
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

  const handleDraftChange = (field) => (event) => {
    setDraftProfile((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSaveProfile = () => {
    const nextProfile = {
      ...draftProfile,
      name: draftProfile.name.trim() || currentUser.name,
      email: draftProfile.email.trim() || currentUser.email,
      bio: draftProfile.bio.trim() || currentUser.bio,
      status: draftProfile.status.trim() || currentUser.status,
      username: currentUser.username,
    };

    setProfileDetails(nextProfile);
    setDraftProfile(nextProfile);
    window.localStorage.setItem(PROFILE_DETAILS_STORAGE_KEY, JSON.stringify(nextProfile));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setDraftProfile(profileDetails);
    setIsEditing(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 px-3 py-4 backdrop-blur-xs sm:px-4 sm:py-6">
      <div
        className="mx-auto flex min-h-0 w-full max-w-3xl flex-col overflow-hidden rounded-[24px] border border-white/70 bg-white/95 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:max-h-[min(88vh,680px)] sm:p-5"
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

        <div className="thin-scrollbar mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="grid gap-3 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="rounded-[22px] border border-slate-200/80 bg-[linear-gradient(145deg,rgba(240,249,255,0.95),rgba(255,255,255,0.98))] p-4 shadow-[0_8px_30px_rgba(148,163,184,0.10)]">
            <div className="flex items-center gap-3 text-left lg:flex-col lg:text-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={profileDetails.name}
                  className="h-16 w-16 shrink-0 rounded-full border-4 border-white object-cover shadow-lg shadow-slate-300/40 sm:h-20 sm:w-20"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-300 via-sky-400 to-blue-500 text-xl font-semibold text-slate-950 shadow-lg shadow-cyan-950/15 sm:h-20 sm:w-20 sm:text-2xl">
                  {initials}
                </div>
              )}

              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold text-slate-800">{profileDetails.name}</h3>
                <p className="mt-0.5 truncate text-sm text-slate-500">{profileDetails.username}</p>
                <p className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  {profileDetails.status}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-1">
              <button
                type="button"
                onClick={handlePickImage}
                className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(14,165,233,0.28)] hover:bg-sky-600"
              >
                <HiOutlineArrowUpTray className="text-base" />
                {profileImage ? 'Change' : 'Upload'}
              </button>

              <button
                type="button"
                onClick={() => setIsEditing((prev) => !prev)}
                className="flex items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700 hover:bg-amber-100"
              >
                <HiOutlinePencilSquare className="text-base" />
                {isEditing ? 'Editing' : 'Edit'}
              </button>

              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={!profileImage}
                className={`col-span-2 flex items-center justify-center gap-2 rounded-2xl border px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] lg:col-span-1 ${
                  profileImage
                    ? 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'
                    : 'border-slate-200 bg-slate-100 text-slate-400'
                }`}
              >
                <HiOutlineTrash className="text-base" />
                Remove
              </button>
            </div>

            <div className="mt-4 grid gap-2">
              <article className="rounded-[18px] border border-slate-200/80 bg-white px-3.5 py-3 shadow-[0_8px_24px_rgba(148,163,184,0.08)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Username
                </p>
                <p className="mt-1.5 text-sm text-slate-700">{profileDetails.username}</p>
              </article>

              <article className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 px-3.5 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Profile Photo
                </p>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  Upload a photo or keep the initials-based avatar.
                </p>
              </article>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            </aside>

            <div className="min-h-0 space-y-2.5">
              {isEditing ? (
                <article className="rounded-[20px] border border-slate-200/80 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(148,163,184,0.08)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Edit Profile
                  </p>

                  <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Name
                      </span>
                      <input
                        type="text"
                        value={draftProfile.name}
                        onChange={handleDraftChange('name')}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-300"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        Status
                      </span>
                      <input
                        type="text"
                        value={draftProfile.status}
                        onChange={handleDraftChange('status')}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-300"
                      />
                    </label>
                  </div>

                  <label className="mt-2.5 block">
                    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Email
                    </span>
                    <input
                      type="email"
                      value={draftProfile.email}
                      onChange={handleDraftChange('email')}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-sky-300"
                    />
                  </label>

                  <label className="mt-2.5 block">
                    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Bio
                    </span>
                    <textarea
                      rows="4"
                      value={draftProfile.bio}
                      onChange={handleDraftChange('bio')}
                      className="thin-scrollbar w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm leading-6 text-slate-700 outline-none focus:border-sky-300"
                    />
                  </label>

                  <div className="mt-3 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      className="rounded-full bg-sky-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(14,165,233,0.28)] hover:bg-sky-600"
                    >
                      Save
                    </button>
                  </div>
                </article>
              ) : null}

              {!isEditing ? (
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <article className="rounded-[20px] border border-slate-200/80 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(148,163,184,0.08)]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Email
                    </p>
                    <p className="mt-1.5 break-words text-sm text-slate-700">{profileDetails.email}</p>
                  </article>

                  <article className="rounded-[20px] border border-slate-200/80 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(148,163,184,0.08)]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Status
                    </p>
                    <p className="mt-1.5 text-sm text-slate-700">{profileDetails.status}</p>
                  </article>
                </div>
              ) : null}

              <article className="rounded-[20px] border border-slate-200/80 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(148,163,184,0.08)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Bio
                </p>
                <p className="mt-1.5 text-sm leading-6 text-slate-700">{profileDetails.bio}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
