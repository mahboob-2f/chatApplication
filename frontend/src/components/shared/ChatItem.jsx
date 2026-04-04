import React from 'react';
import { HiOutlineSpeakerWave, HiOutlineUserGroup } from 'react-icons/hi2';
import ChatAvatar from './ChatAvatar';

const ChatItem = ({ chat, active, onClick }) => {
  const Icon = chat.type === 'group' ? HiOutlineUserGroup : HiOutlineSpeakerWave;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-2 rounded-2xl border px-2.5 py-2 text-left transition-all duration-300 sm:px-3 ${
        active
          ? 'border-cyan-300/45 bg-linear-to-r from-cyan-400/20 to-blue-500/20 shadow-lg shadow-cyan-950/20'
          : 'border-white/8 bg-white/4 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8'
      }`}
    >
      <div className="relative shrink-0">
        <ChatAvatar chat={chat} size="sm" />
        <span
          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-950 ${
            chat.statusColor || 'bg-emerald-400'
          }`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-[12px] font-semibold text-white sm:text-[13px]">{chat.name}</h3>
          <span className="shrink-0 text-[9px] font-medium uppercase tracking-[0.14em] text-slate-400">
            {chat.time}
          </span>
        </div>

        <div className="mt-0.5 flex items-center gap-1">
          <Icon className="shrink-0 text-xs text-cyan-200/85" />
          <p className="truncate text-[10px] text-slate-300 sm:text-[11px]">{chat.lastMessage}</p>
        </div>
      </div>

      {!!chat.unread && (
        <span className="flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[8px] font-bold text-slate-950 shadow-md shadow-cyan-950/20">
          {chat.unread}
        </span>
      )}
    </button>
  );
};

export default ChatItem;
