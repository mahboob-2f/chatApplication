import React, { lazy, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
const ChatItem = lazy(() => import('../shared/ChatItem'));

const ChatList = ({ chats, activeChatId, onChatSelect }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return chats;

    return chats.filter((chat) => chat.name.toLowerCase().includes(query));
  }, [chats, searchQuery]);

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
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/8 px-3 py-2.5 text-xs text-white outline-none placeholder:text-slate-400 focus:border-cyan-300/40 sm:text-sm"
        />
      </div>

      <div className="thin-scrollbar min-h-0 flex-1 space-y-2.5 overflow-y-auto pr-1">
        {filteredChats.length ? (
          filteredChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              active={activeChatId === chat.id}
              onClick={() => handleSelect(chat.id)}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/4 px-3 py-5 text-center">
            <p className="text-sm font-medium text-white">No chat found</p>
            <p className="mt-1 text-xs text-slate-400">
              Try searching with another user or group name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
