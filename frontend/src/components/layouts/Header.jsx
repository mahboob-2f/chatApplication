import React, { useState } from 'react';
import {
  HiOutlineBars3,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { actionButtons } from '../../constants/header';
import { useNavigate } from 'react-router';
import UserSearchModal from './UserSearchModal';
import NotificationsModal from './NotificationsModal';
import ProfileModal from './ProfileModal';


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const handleActionClick = (actionId) => {
    if (actionId === 'search') {
      setIsSearchOpen(true);
    }

    if (actionId === 'notifications') {
      setIsNotificationsOpen(true);
    }

    if (actionId === 'profile') {
      setIsProfileOpen(true);
    }

    closeMobileMenu();
  };

  return (
    <>
      <header className="rounded-[22px] border border-rose-200/30 bg-linear-to-r from-rose-400 via-rose-400 to-rose-500 px-3 py-2.5 shadow-xl shadow-rose-950/25 sm:rounded-3xl sm:px-4">
        <div className="flex items-center justify-between gap-3">
          <div onClick={() => navigate('/')} className="flex min-w-0 cursor-pointer items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950/15 text-base text-white ring-1 ring-white/25 sm:h-11 sm:w-11 ">
              <img src="/logo.png" alt="Logo" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-[9px] font-semibold uppercase tracking-[0.24em] text-rose-50/80 sm:text-[10px]">
                Chat Platform
              </p>
              <h1 className="truncate text-sm font-semibold text-white sm:text-lg">Connectify</h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <div className="flex flex-wrap items-center gap-1.5">
              {actionButtons.map(({ id, label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  title={label}
                  onClick={() => handleActionClick(id)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-lg text-white backdrop-blur hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-xl text-white backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/70 lg:hidden"
          >
            {isMobileMenuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            isMobileMenuOpen ? 'mt-3 max-h-[20rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-3 rounded-[18px] border border-white/15 bg-slate-950/15 p-3 backdrop-blur">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {actionButtons.map(({ id, label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleActionClick(id)}
                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-xs font-medium text-white"
                >
                  <span className="text-base">
                    <Icon />
                  </span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <UserSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};

export default Header;
