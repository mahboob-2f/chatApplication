import React, { useEffect, useMemo, useState } from 'react';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineUserGroup,
  HiOutlineXMark,
} from 'react-icons/hi2';
import { dummyUsers } from '../../constants/users';

const CreateGroupModal = ({ isOpen, onClose, onCreate }) => {
  const [groupName, setGroupName] = useState('');
  const [query, setQuery] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setGroupName('');
      setQuery('');
      setSelectedUserIds([]);
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

  const trimmedName = groupName.trim();
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

  const selectedMembers = dummyUsers.filter((user) => selectedUserIds.includes(user.id));
  const canCreate = trimmedName.length >= 3 && selectedUserIds.length >= 2;

  if (!isOpen) {
    return null;
  }

  const handleToggleMember = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canCreate) {
      return;
    }

    onCreate({
      name: trimmedName,
      members: selectedMembers,
    });

    setGroupName('');
    setQuery('');
    setSelectedUserIds([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-[4px]">
      <div
        className="flex h-[min(88vh,720px)] w-full max-w-md flex-col overflow-hidden rounded-[24px] border border-white/70 bg-white/95 p-3.5 shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:max-w-lg sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-group-title"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="w-full">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Communities
            </p>
            <h2
              id="create-group-title"
              className="mt-1 text-[1.75rem] font-semibold leading-none text-slate-800 sm:text-[1.9rem]"
            >
              Create Group
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close create group"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[16px] border border-slate-200 bg-slate-50 text-base text-slate-500 hover:bg-slate-100"
          >
            <HiOutlineXMark />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-3 flex min-h-0 flex-1 flex-col">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Group name
            </span>
            <input
              type="text"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              placeholder="Frontend Launch"
              className="w-full rounded-[16px] border border-slate-200 bg-white px-3.5 py-2.5 text-[14px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-rose-300 sm:text-[15px]"
            />
          </label>

          <div className="mt-2.5 rounded-[18px] border border-slate-200/80 bg-white px-3.5 py-2.5 shadow-[0_8px_24px_rgba(148,163,184,0.08)]">
            <div className="flex items-start gap-2.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <HiOutlineUserGroup className="text-base" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800">{trimmedName || 'Your new group'}</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500 sm:text-[13px]">
                  {selectedUserIds.length} member{selectedUserIds.length === 1 ? '' : 's'} selected
                </p>
              </div>
            </div>
          </div>

          {selectedMembers.length > 0 ? (
            <div className="mt-2.5">
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Members
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedMembers.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => handleToggleMember(member.id)}
                    className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-semibold text-rose-600 sm:text-[11px]"
                  >
                    <span>{member.name}</span>
                    <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.12em]">
                      Remove
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-2.5 flex items-center gap-2.5 rounded-[18px] border border-slate-200 bg-slate-50/90 px-3 py-2 shadow-inner shadow-slate-200/30">
            <HiOutlineMagnifyingGlass className="text-base text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or username"
              className="w-full border-none bg-transparent text-[14px] text-slate-700 outline-none placeholder:text-slate-400 sm:text-[15px]"
            />
          </div>

          <div className="thin-scrollbar mt-3 min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const isSelected = selectedUserIds.includes(user.id);

                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between gap-2.5 rounded-[18px] border border-slate-200/80 bg-white px-3 py-2 shadow-[0_8px_24px_rgba(148,163,184,0.08)]"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-xs font-semibold ${user.avatarClassName}`}
                        aria-hidden="true"
                      >
                        {user.initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold leading-5 text-slate-800">{user.name}</p>
                        <p className="truncate text-[13px] leading-4 text-slate-500">{user.username}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleMember(user.id)}
                      className={`shrink-0 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all sm:min-w-[78px] sm:px-3 ${
                        isSelected
                          ? 'border-rose-200 bg-rose-50 text-rose-600 shadow-[0_8px_18px_rgba(244,63,94,0.18)]'
                          : 'border-sky-600 bg-sky-500 text-white shadow-[0_10px_24px_rgba(14,165,233,0.28)] hover:bg-sky-600'
                      }`}
                    >
                      {isSelected ? 'Remove' : 'Add'}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="flex min-h-[180px] items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-slate-50 px-4 py-7 text-center">
                <div>
                  <p className="text-[15px] font-semibold text-slate-700">No users found</p>
                  <p className="mt-1 text-sm text-slate-500">Try a different name or username.</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-200 pt-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canCreate}
              className={`rounded-full px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white ${
                canCreate ? 'bg-rose-500 shadow-[0_10px_24px_rgba(244,63,94,0.28)] hover:bg-rose-600' : 'bg-slate-300'
              }`}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
