import React from 'react';
import { HiOutlineSpeakerWave, HiOutlineUserGroup } from 'react-icons/hi2';

const ChatItem = ({ chat, active, onClick }) => {
  const Icon = chat.type === 'group' ? HiOutlineUserGroup : HiOutlineSpeakerWave;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-2.5 rounded-2xl border px-2.5 py-2.5 text-left transition-all duration-300 sm:px-3 ${
        active
          ? 'border-cyan-300/45 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 shadow-lg shadow-cyan-950/20'
          : 'border-white/8 bg-white/[0.04] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]'
      }`}
    >
      <div className="relative shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-950/15 sm:h-11 sm:w-11">
          {chat.avatar}
        </div>
        <span
          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-950 ${
            chat.statusColor || 'bg-emerald-400'
          }`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-[13px] font-semibold text-white sm:text-sm">{chat.name}</h3>
          <span className="shrink-0 text-[9px] font-medium uppercase tracking-[0.14em] text-slate-400">
            {chat.time}
          </span>
        </div>

        <div className="mt-0.5 flex items-center gap-1.5">
          <Icon className="shrink-0 text-xs text-cyan-200/85" />
          <p className="truncate text-[11px] text-slate-300 sm:text-xs">{chat.lastMessage}</p>
        </div>
      </div>

      {!!chat.unread && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[9px] font-bold text-slate-950 shadow-md shadow-cyan-950/20">
          {chat.unread}
        </span>
      )}
    </button>
  );
};

export default ChatItem;
