import React from 'react';
import { HiOutlineChatBubbleLeftRight, HiOutlinePhone, HiOutlineVideoCamera } from 'react-icons/hi2';

const detailSections = [
  { label: 'Timezone', value: 'GMT +5:30' },
  { label: 'Shared Groups', value: 'Design Crew, Launch Team' },
  { label: 'Availability', value: 'Usually replies within 10 min' },
];

const Profile = ({ chat }) => {
  if (!chat) return null;

  return (
    <section className="thin-scrollbar h-full min-h-0 space-y-3.5 overflow-y-auto pr-1">
      <div className="rounded-[22px] border border-white/10 bg-gradient-to-br from-cyan-400/20 via-sky-500/10 to-blue-500/15 p-4 text-center shadow-xl shadow-slate-950/20">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 text-xl font-bold text-slate-950 shadow-lg shadow-cyan-950/20">
          {chat.avatar}
        </div>
        <h3 className="mt-3 text-base font-semibold text-white">{chat.name}</h3>
        <p className="mt-1 text-xs text-cyan-100 sm:text-sm">{chat.role}</p>
        <p className="mt-2 text-[11px] leading-5 text-slate-300 sm:text-xs">{chat.about}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button type="button" className="rounded-xl border border-white/10 bg-white/5 px-2 py-2.5 text-center text-[11px] text-white transition-all duration-200 hover:bg-white/10">
          <HiOutlinePhone className="mx-auto text-base text-cyan-200" />
          <span className="mt-1 block">Call</span>
        </button>
        <button type="button" className="rounded-xl border border-white/10 bg-white/5 px-2 py-2.5 text-center text-[11px] text-white transition-all duration-200 hover:bg-white/10">
          <HiOutlineVideoCamera className="mx-auto text-base text-cyan-200" />
          <span className="mt-1 block">Video</span>
        </button>
        <button type="button" className="rounded-xl border border-white/10 bg-white/5 px-2 py-2.5 text-center text-[11px] text-white transition-all duration-200 hover:bg-white/10">
          <HiOutlineChatBubbleLeftRight className="mx-auto text-base text-cyan-200" />
          <span className="mt-1 block">Mute</span>
        </button>
      </div>

      <div className="space-y-2.5">
        {detailSections.map((item) => (
          <article key={item.label} className="rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2.5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {item.label}
            </p>
            <p className="mt-1.5 text-xs text-slate-200 sm:text-sm">{item.value}</p>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-white/8 bg-white/[0.04] px-3 py-3">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Media & Files
        </p>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {['UI', 'Docs', 'Meet', 'Team', 'Notes', 'Links'].map((item) => (
            <div key={item} className="rounded-xl bg-slate-900/70 px-2 py-3 text-center text-[11px] text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
