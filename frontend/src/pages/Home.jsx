import React from 'react';
import SplashCursor from '../components/SplashCursor';


const Home = () => {
  return (
    <section className="fade-in relative flex h-full min-h-0 items-center justify-center overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),transparent_30%),radial-gradient(circle_at_bottom,rgba(244,114,182,0.14),transparent_24%),linear-gradient(145deg,rgba(15,23,42,0.98),rgba(17,24,39,0.96),rgba(8,47,73,0.95))]">
      <SplashCursor
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={768}
        DENSITY_DISSIPATION={1}
        VELOCITY_DISSIPATION={1}
        PRESSURE={0.1}
        CURL={1}
        SPLAT_RADIUS={0.05}
        SPLAT_FORCE={2000}
        COLOR_UPDATE_SPEED={8}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.12),rgba(2,6,23,0.26))]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_28%)]" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-14">
        <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-white/92 p-3 shadow-xl shadow-black/20 ring-1 ring-white/20 sm:h-28 sm:w-28">
          <img
            src="/logo2.png"
            alt="Connectify Logo"
            className="h-full w-full object-contain"
          />
        </div>

        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Connectify
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-100 sm:text-base">
          Connectify is a real-time chat application built for personal messaging and smooth group
          collaboration. Select any conversation from the sidebar to start chatting, explore
          profile details, and manage communication in one clean workspace.
        </p>
      </div>
    </section>
  );
};

export default Home;
