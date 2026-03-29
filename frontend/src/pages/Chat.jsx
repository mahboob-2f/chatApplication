import React from 'react';

const Chat = () => {
  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200/80">Chat</p>
        <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">Conversation View</h2>
        <p className="mt-3 text-xs leading-6 text-slate-300 sm:text-sm">
          This area is ready for your message list and composer. The layout keeps content readable
          on mobile first, then expands into a wider workspace on larger screens.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
        <div className="rounded-[24px] border border-white/10 bg-slate-900/55 p-5">
          <h3 className="text-base font-semibold text-white">Messages</h3>
          <div className="mt-4 space-y-3 text-xs text-slate-300 sm:text-sm">
            <div className="rounded-2xl bg-white/8 px-4 py-3">Responsive message list placeholder</div>
            <div className="rounded-2xl bg-white/5 px-4 py-3">Incoming and outgoing bubbles can go here</div>
            <div className="rounded-2xl bg-white/5 px-4 py-3">Composer can stay fixed at the bottom later</div>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-900/55 p-5">
          <h3 className="text-base font-semibold text-white">Chat Details</h3>
          <div className="mt-4 space-y-3 text-xs text-slate-300 sm:text-sm">
            <div className="rounded-2xl bg-white/8 px-4 py-3">Members</div>
            <div className="rounded-2xl bg-white/5 px-4 py-3">Shared files</div>
            <div className="rounded-2xl bg-white/5 px-4 py-3">Mute and notification settings</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
