import React, { useEffect, useMemo, useState } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlinePlus, HiOutlineXMark } from 'react-icons/hi2';
import { dummyUsers } from '../../constants/users';

const UserSearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
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

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return dummyUsers;
    }

    return dummyUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.username.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const handleSendRequest = (userId) => {
    setSentRequests((prev) => (prev.includes(userId) ? prev : [...prev, userId]));
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
        aria-labelledby="find-people-title"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="w-full">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Connections
            </p>
            <h2 id="find-people-title" className="mt-1.5 text-[2rem] font-semibold leading-none text-slate-800">
              Find People
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] border border-slate-200 bg-slate-50 text-lg text-slate-500 hover:bg-slate-100"
          >
            <HiOutlineXMark />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2.5 rounded-[20px] border border-slate-200 bg-slate-50/90 px-4 py-2.5 shadow-inner shadow-slate-200/30">
          <HiOutlineMagnifyingGlass className="text-lg text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name or username"
            className="w-full border-none bg-transparent text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="thin-scrollbar mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const isSent = sentRequests.includes(user.id);

              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between gap-3 rounded-[20px] border border-slate-200/80 bg-white px-3 py-2.5 shadow-[0_8px_24px_rgba(148,163,184,0.08)]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold ${user.avatarClassName}`}
                      aria-hidden="true"
                    >
                      {user.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold leading-5 text-slate-800">{user.name}</p>
                      <p className="truncate text-sm leading-4.5 text-slate-500">{user.username}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSendRequest(user.id)}
                    disabled={isSent}
                    className={`flex h-9 items-center justify-center rounded-full border transition-all ${
                      isSent
                        ? 'min-w-[84px] border-emerald-200 bg-emerald-50 px-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-600 shadow-[0_8px_18px_rgba(16,185,129,0.18)]'
                        : 'w-9 border-sky-600 bg-sky-500 text-base text-white shadow-[0_10px_24px_rgba(14,165,233,0.28)] hover:bg-sky-600'
                    }`}
                  >
                    {isSent ? 'Sent' : <HiOutlinePlus />}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-slate-50 px-4 py-7 text-center">
              <div>
              <p className="text-[15px] font-semibold text-slate-700">No users found</p>
              <p className="mt-1 text-sm text-slate-500">Try a different name or username.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSearchModal;
