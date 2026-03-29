import React from 'react';
import { useNavigate } from 'react-router';
import ChatItem from '../shared/ChatItem';

const ChatList = ({ chats, activeChatId, onChatSelect }) => {
  const navigate = useNavigate();

  const handleSelect = (chatId) => {
    navigate(`/chat/${chatId}`);
    onChatSelect?.();
  };

  return (
    <div className="flex h-full min-h-0 flex-col gap-2.5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-100/80">
          Chat List
        </p>
        <h2 className="mt-1.5 text-base font-semibold text-white">Messages & Groups</h2>
      </div>

      <div className="rounded-[18px] border border-white/10 bg-slate-950/35 p-2.5">
        <input
          type="text"
          placeholder="Search chats"
          className="w-full rounded-xl border border-white/10 bg-white/8 px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-400 focus:border-cyan-300/40 sm:text-sm"
        />
      </div>

      <div className="thin-scrollbar min-h-0 flex-1 space-y-2.5 overflow-y-auto pr-1">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            active={activeChatId === chat.id}
            onClick={() => handleSelect(chat.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
