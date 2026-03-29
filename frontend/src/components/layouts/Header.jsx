import React, { useState } from 'react';
import {
  HiOutlineBars3,
  HiOutlineBell,
  HiOutlinePlus,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { IoSearchOutline } from 'react-icons/io5';
import { RiMessage3Line } from 'react-icons/ri';

const actionButtons = [
  { label: 'Search', icon: IoSearchOutline },
  { label: 'New', icon: HiOutlinePlus },
  { label: 'Groups', icon: HiOutlineUserGroup },
  { label: 'Notifications', icon: HiOutlineBell },
  { label: 'Profile', icon: HiOutlineUserCircle },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="rounded-[26px] border border-rose-200/30 bg-gradient-to-r from-rose-400 via-rose-400 to-rose-500 px-4 py-4 shadow-xl shadow-rose-950/25 sm:rounded-[30px] sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950/15 text-lg text-white ring-1 ring-white/25 sm:h-12 sm:w-12">
            <RiMessage3Line />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.3em] text-rose-50/80 sm:text-xs">
              Chat Platform
            </p>
            <h1 className="truncate text-base font-semibold text-white sm:text-xl">ConnectHub</h1>
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex flex-wrap items-center gap-2">
            {actionButtons.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                title={label}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xl text-white backdrop-blur hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
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
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-2xl text-white backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/70 lg:hidden"
        >
          {isMobileMenuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? 'mt-4 max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-4 rounded-[24px] border border-white/15 bg-slate-950/15 p-4 backdrop-blur">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {actionButtons.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-medium text-white sm:text-sm"
              >
                <span className="text-lg">
                  <Icon />
                </span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
