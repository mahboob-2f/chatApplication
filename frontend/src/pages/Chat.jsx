import React, { useMemo, useState } from 'react';
import { useOutletContext, useParams } from 'react-router';
import {
  HiOutlineEllipsisVertical,
  HiOutlineMagnifyingGlass,
  HiOutlinePhone,
  HiOutlineVideoCamera,
} from 'react-icons/hi2';
import ChatAvatar from '../components/shared/ChatAvatar';
import { chatMessages } from '../constants/chatMessages';

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightMessageText = (text, query) => {
  if (!query) return text;

  const pattern = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={`${part}-${index}`}
        className="rounded-sm bg-amber-300 px-1 py-0.5 font-semibold text-slate-950"
      >
        {part}
      </mark>
    ) : (
      <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
    )
  );
};

const Chat = () => {
  const { chatId } = useParams();
  const { selectedChat, openProfile, isProfileOpen, toggleProfile } = useOutletContext();
  const messages = chatMessages[chatId] ?? [];
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const activeSearchQuery = searchInput.trim();

  const matchedMessageIds = useMemo(() => {
    const query = activeSearchQuery.trim().toLowerCase();

    if (!query) return new Set();

    return new Set(
      messages
        .filter((message) => message.text.toLowerCase().includes(query))
        .map((message) => message.id)
    );
  }, [activeSearchQuery, messages]);

  if (!selectedChat || selectedChat.id !== chatId) {
    return (
      <section className="thin-scrollbar flex h-full min-h-0 items-center justify-center overflow-y-auto rounded-[22px] border border-dashed border-white/10 bg-white/[0.03] p-5 text-center">
        <div>
          <h2 className="text-lg font-semibold text-white">Conversation not found</h2>
          <p className="mt-2 text-xs text-slate-300 sm:text-sm">
            Select a valid chat from the sidebar to start messaging.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-col gap-2.5">
      <header className="flex flex-col gap-2.5 rounded-[20px] border border-white/10 bg-white/6 p-2.5 shadow-xl shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between sm:p-3">
        <button
          type="button"
          onClick={openProfile}
          className="flex items-center gap-2.5 rounded-2xl text-left transition-all duration-200 hover:bg-white/4 sm:p-1"
        >
          <ChatAvatar chat={selectedChat} size="md" />
          <div>
            <p className="text-sm font-semibold text-white sm:text-base">{selectedChat.name}</p>
            <p className="text-[11px] text-cyan-100 sm:text-xs">
              {selectedChat.role} {isProfileOpen ? '• profile open' : '• tap to view details'}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isSearchOpen && (
            <input
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search"
              autoFocus
              className="h-9 w-32 rounded-xl border border-white/10 bg-slate-950/70 px-3 text-xs text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/35 sm:h-10 sm:w-40 sm:text-sm"
            />
          )}
          <button
            type="button"
            onClick={() => {
              if (isSearchOpen) {
                setSearchInput('');
              }
              setIsSearchOpen((prev) => !prev);
            }}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border text-base transition-all duration-200 hover:-translate-y-0.5 sm:h-10 sm:w-10 ${
              isSearchOpen
                ? 'border-cyan-300/25 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/20'
                : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            <HiOutlineMagnifyingGlass />
          </button>
          {[HiOutlinePhone, HiOutlineVideoCamera].map((Icon, index) => (
            <button
              key={index}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-base text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 sm:h-10 sm:w-10"
            >
              <Icon />
            </button>
          ))}
          <button
            type="button"
            onClick={toggleProfile}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-400/10 text-base text-cyan-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-400/20 sm:h-10 sm:w-10"
          >
            <HiOutlineEllipsisVertical />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,_rgba(15,23,42,0.72),_rgba(8,47,73,0.42))] p-2.5 shadow-2xl shadow-slate-950/20 sm:p-3">
        <div className="thin-scrollbar min-h-0 flex-1 space-y-2.5 overflow-y-auto pr-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-[11px] leading-5 shadow-lg sm:max-w-[70%] sm:text-xs ${
                  message.type === 'outgoing'
                    ? 'bg-linear-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-cyan-950/20'
                    : 'border border-white/10 bg-white/[0.07] text-slate-100 shadow-slate-950/10'
                } ${matchedMessageIds.has(message.id) ? 'ring-2 ring-amber-300/90 ring-offset-2 ring-offset-slate-950/40' : ''}`}
              >
                <p>{highlightMessageText(message.text, activeSearchQuery)}</p>
                <span
                  className={`mt-1 block text-[9px] ${
                    message.type === 'outgoing' ? 'text-slate-900/70' : 'text-slate-400'
                  }`}
                >
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2.5 rounded-2xl border border-white/10 bg-white/4 p-2.5">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-end">
            <textarea
              rows="2"
              placeholder="Write a message..."
              className="thin-scrollbar min-h-[56px] max-h-24 flex-1 resize-none overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-500 focus:border-cyan-300/35 sm:text-sm"
            />
            <button
              type="button"
              className="rounded-2xl bg-linear-to-r from-cyan-400 via-sky-500 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-950/20 transition-all duration-200 hover:-translate-y-0.5 sm:text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
