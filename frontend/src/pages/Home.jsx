import React from 'react';
import { RiMessage3Line } from 'react-icons/ri';

const featureCards = [
  {
    title: 'Pick a Conversation',
    description:
      'Choose any user or group from the left sidebar to open the full chat workspace.',
  },
  {
    title: 'Open Profile Details',
    description:
      'Inside the chat view, click the profile area in the header to reveal the contact panel.',
  },
  {
    title: 'Built for Every Screen',
    description:
      'The layout keeps chat list, messages, and profile details responsive from phones to desktops.',
  },
];

const Home = () => {
  return (
    <section className="thin-scrollbar fade-in h-full min-h-0 space-y-3 overflow-y-auto pr-1 sm:space-y-4">
      <div className="rounded-[22px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_36%),linear-gradient(145deg,_rgba(15,23,42,0.94),_rgba(15,118,110,0.42))] p-4 shadow-2xl shadow-slate-950/20 sm:p-5 md:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100/80">
          Chat Application
        </p>
        <div className="mt-4 flex flex-col gap-4 md:gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
              Welcome to ConnectHub
            </h2>
            <p className="mt-3 text-xs leading-6 text-slate-200 sm:text-sm md:text-[15px]">
              A clean messaging workspace for personal chats and group collaboration. Start by
              selecting a conversation from the left sidebar. The main area will open that chat,
              and the right sidebar stays free until you decide to inspect someone&apos;s profile.
            </p>
          </div>

          <div className="flex h-18 w-18 items-center justify-center rounded-[22px] bg-white/10 text-3xl text-cyan-200 shadow-xl shadow-slate-950/20 ring-1 ring-white/10 sm:h-20 sm:w-20 sm:text-4xl">
            <RiMessage3Line />
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featureCards.map(({ title, description }) => (
          <article
            key={title}
            className="rounded-[18px] border border-white/10 bg-slate-900/55 p-4 shadow-lg shadow-black/15"
          >
            <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>
            <p className="mt-1.5 text-[11px] leading-5 text-slate-300 sm:text-xs">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Home;
