import React from 'react';

const groups = ['Design Team', 'Frontend Squad', 'Project Updates', 'Community Lounge'];

const Groups = () => {
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
            key={group}
            className="rounded-[24px] border border-white/10 bg-slate-900/55 p-5 shadow-lg shadow-black/15"
          >
            <h3 className="text-base font-semibold text-white">{group}</h3>
            <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-sm">
              Responsive placeholder card for group details, members, and recent activity.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Groups;
