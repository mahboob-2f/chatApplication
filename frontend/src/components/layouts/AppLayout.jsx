import React, { lazy } from 'react';
import { Outlet } from 'react-router';
import Title from '../shared/Title';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,113,133,0.22),_transparent_32%),linear-gradient(180deg,_#0f172a_0%,_#111827_100%)]">
      <Title title="Home | Chat App" description="Chat App home page" />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
        <Header />
        <div className="mt-4 grid flex-1 gap-4 md:mt-6 md:gap-6 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_280px]">
          <aside className="order-2 rounded-[24px] border border-white/10 bg-white/5 p-4 text-slate-300 shadow-2xl shadow-black/20 sm:p-5 lg:order-1 lg:rounded-[28px] lg:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200/80">
              Navigation
            </p>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-2xl bg-white/8 px-4 py-3">Recent Chats</div>
              <div className="rounded-2xl bg-white/5 px-4 py-3">Pinned Groups</div>
              <div className="rounded-2xl bg-white/5 px-4 py-3">Shared Media</div>
            </div>
          </aside>

          <main className="order-1 min-h-[58vh] rounded-[24px] border border-white/10 bg-slate-950/60 p-4 shadow-2xl shadow-black/25 backdrop-blur sm:min-h-[64vh] sm:p-5 lg:order-2 lg:rounded-[32px] lg:p-6">
            <Outlet />
          </main>

          <aside className="order-3 rounded-[24px] border border-white/10 bg-white/5 p-4 text-slate-300 shadow-2xl shadow-black/20 sm:p-5 xl:rounded-[28px] xl:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200/80">
              Activity
            </p>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-2xl bg-white/8 px-4 py-3">Notifications panel</div>
              <div className="rounded-2xl bg-white/5 px-4 py-3">Online teammates</div>
              <div className="rounded-2xl bg-white/5 px-4 py-3">Quick actions</div>
            </div>
          </aside>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;


