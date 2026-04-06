import React from 'react';
import { useOutletContext } from 'react-router';

const Groups = () => {
  const { groups } = useOutletContext();

  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-200/80">
          Groups
        </p>
        <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">Manage Your Communities</h2>
        <p className="mt-3 text-xs leading-6 text-slate-300 sm:text-sm">
          Group cards now stack naturally on smaller screens and spread into multiple columns on
          tablets and desktop.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <article
            key={group.id}
            className="rounded-[24px] border border-white/10 bg-slate-900/55 p-5 shadow-lg shadow-black/15"
          >
            <h3 className="text-base font-semibold text-white">{group.name}</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/80">
              {group.members.length} members
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.members.map((member) => (
                <span
                  key={member.id}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[11px] text-slate-200"
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${member.avatarClassName}`}
                  >
                    {member.initials}
                  </span>
                  <span>{member.name}</span>
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Groups;
