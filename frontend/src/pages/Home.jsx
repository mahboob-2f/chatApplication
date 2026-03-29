import React from 'react';

const featureCards = [
  {
    title: 'Realtime Chat',
    description:
      'Keep your conversations in one place with a layout that stays readable on small and large screens.',
  },
  {
    title: 'Smart Groups',
    description:
      'Jump into teams, projects, and announcements without losing your current navigation context.',
  },
  {
    title: 'Responsive Actions',
    description:
      'Desktop shows quick icons, while mobile collects everything inside the hamburger menu.',
  },
];

const Home = () => {
  return (
    <section className="fade-in space-y-4 sm:space-y-6">
      <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 sm:rounded-[28px] sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200/80">
          Home
        </p>
        <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
          Your main chat dashboard starts here.
        </h2>
        <p className="mt-3 max-w-2xl text-xs leading-6 text-slate-300 sm:text-sm">
          The shared layout now adapts across phones, tablets, and desktops. On mobile, the
          hamburger menu reveals navigation and header actions without overcrowding the top bar.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featureCards.map(({ title, description }) => (
          <article
            key={title}
            className="rounded-[24px] border border-white/10 bg-slate-900/55 p-5 shadow-lg shadow-black/15"
          >
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Home;
