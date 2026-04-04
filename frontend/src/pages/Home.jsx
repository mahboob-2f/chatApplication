import React from 'react';
import {
  HiOutlineArrowTrendingUp,
  HiOutlineSparkles,
  HiOutlineUserGroup,
} from 'react-icons/hi2';
import { featureCards } from '../constants/home';
import { chats } from '../constants/chats';

const Home = () => {
  const totalUnread = chats.reduce((count, chat) => count + chat.unread, 0);
  const groupChats = chats.filter((chat) => chat.type === 'group').length;

  return (
    <section className="thin-scrollbar fade-in h-full min-h-0 space-y-3 overflow-y-auto pr-1 sm:space-y-4">
      <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.16),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.94),rgba(8,47,73,0.92))] p-4 shadow-2xl shadow-slate-950/30 sm:p-5 lg:p-6">
        <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 left-10 h-32 w-32 rounded-full bg-rose-300/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100/85">
              <HiOutlineSparkles className="text-sm" />
              Connectify Workspace
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-2.5 shadow-xl shadow-black/20 ring-1 ring-white/20 sm:h-20 sm:w-20">
                <img
                  src="/logo2.png"
                  alt="Connectify Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-rose-100/75">
                  Chat Platform
                </p>
                <h2 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Connectify
                </h2>
              </div>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-[15px]">
              A polished messaging space for direct conversations, focused team discussions, and
              fast collaboration. Open any chat from the sidebar to jump into the conversation and
              inspect profiles without losing your place.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 px-3.5 py-2.5 text-left">
                <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-100/75">Active Chats</p>
                <p className="mt-1 text-xl font-semibold text-white">{chats.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/7 px-3.5 py-2.5 text-left">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Unread Messages</p>
                <p className="mt-1 text-xl font-semibold text-white">{totalUnread}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/7 px-3.5 py-2.5 text-left">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Group Spaces</p>
                <p className="mt-1 text-xl font-semibold text-white">{groupChats}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[360px] lg:grid-cols-1">
            <article className="rounded-[22px] border border-white/10 bg-white/7 p-4 shadow-lg shadow-black/15 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
                  <HiOutlineArrowTrendingUp className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Fast Overview</p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-300">
                    Keep an eye on unread activity and active conversations at a glance.
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-[22px] border border-white/10 bg-white/7 p-4 shadow-lg shadow-black/15 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-400/15 text-rose-100">
                  <HiOutlineUserGroup className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Team Collaboration</p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-300">
                    Move between direct messages and groups without changing your workspace.
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-[22px] border border-cyan-300/15 bg-linear-to-br from-cyan-400/12 to-blue-500/12 p-4 shadow-lg shadow-cyan-950/10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-100/80">Ready To Start</p>
              <p className="mt-2 text-sm font-semibold text-white">
                Select a chat from the left to open your Connectify conversation space.
              </p>
            </article>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="rounded-[22px] border border-white/10 bg-slate-900/55 p-4 shadow-lg shadow-black/15 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100/80">
                Explore
              </p>
              <h3 className="mt-1.5 text-lg font-semibold text-white">What You Can Do</h3>
            </div>
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">
              Features
            </span>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map(({ title, description }) => (
              <article
                key={title}
                className="rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(30,41,59,0.92),rgba(15,23,42,0.95))] p-4 shadow-lg shadow-black/10"
              >
                <h4 className="text-sm font-semibold text-white sm:text-base">{title}</h4>
                <p className="mt-2 text-[11px] leading-5 text-slate-300 sm:text-xs">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[22px] border border-white/10 bg-slate-900/55 p-4 shadow-lg shadow-black/15 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100/80">
            Live Preview
          </p>
          <h3 className="mt-1.5 text-lg font-semibold text-white">Recent Conversations</h3>

          <div className="mt-4 space-y-3">
            {chats.slice(0, 3).map((chat) => (
              <article
                key={chat.id}
                className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 shadow-md shadow-black/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{chat.name}</p>
                    <p className="mt-1 truncate text-[11px] text-slate-300">{chat.lastMessage}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-cyan-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-100">
                    {chat.type}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 rounded-[18px] border border-dashed border-cyan-300/20 bg-cyan-400/6 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-100/75">Connectify Tip</p>
            <p className="mt-2 text-[12px] leading-6 text-slate-200">
              Open any conversation, use in-chat search to highlight important messages, and drag
              the side panels to shape the layout the way you like.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
