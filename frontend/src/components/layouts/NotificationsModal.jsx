import React, { useEffect, useMemo } from 'react';
import { HiOutlineBell, HiOutlineXMark } from 'react-icons/hi2';
import { dummyNotifications } from '../../constants/notifications';

const NotificationsModal = ({ isOpen, onClose, notificationStates, onAction }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const visibleNotifications = useMemo(
    () =>
      dummyNotifications.map((notification) => ({
        ...notification,
        status: notificationStates[notification.id] ?? 'pending',
      })),
    [notificationStates]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-[4px]">
      <div
        className="flex h-[560px] w-full max-w-lg flex-col rounded-[24px] border border-white/70 bg-white/95 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notifications-title"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="w-full">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Updates
            </p>
            <h2 id="notifications-title" className="mt-1.5 text-[2rem] font-semibold leading-none text-slate-800">
              Notifications
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close notifications"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] border border-slate-200 bg-slate-50 text-lg text-slate-500 hover:bg-slate-100"
          >
            <HiOutlineXMark />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-[20px] border border-slate-200 bg-slate-50/90 px-4 py-2.5 text-sm text-slate-500 shadow-inner shadow-slate-200/30">
          <HiOutlineBell className="text-base text-slate-400" />
          <span>{visibleNotifications.filter((item) => item.status === 'pending').length} pending requests</span>
        </div>

        <div className="thin-scrollbar mt-4 min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
          {visibleNotifications.length > 0 ? (
            visibleNotifications.map((notification) => (
              <div
                key={notification.id}
                className="rounded-[18px] border border-slate-200/80 bg-white px-3 py-2.5 shadow-[0_8px_24px_rgba(148,163,184,0.08)]"
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-xs font-semibold ${notification.avatarClassName}`}
                    aria-hidden="true"
                  >
                    {notification.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold leading-5 text-slate-800">
                          {notification.name}
                        </p>
                        <p className="truncate text-[13px] leading-4 text-slate-500">
                          {notification.username}
                        </p>
                      </div>

                      <span className="shrink-0 pt-0.5 text-[10px] font-medium text-slate-400">
                        {notification.time}
                      </span>
                    </div>

                    <p className="mt-1 text-[13px] leading-4.5 text-slate-600">{notification.message}</p>

                    {notification.status === 'pending' ? (
                      <div className="mt-2.5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onAction(notification.id, 'accepted')}
                          className="rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(16,185,129,0.28)] hover:bg-emerald-600"
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() => onAction(notification.id, 'rejected')}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 hover:bg-slate-100"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                            notification.status === 'accepted'
                              ? 'bg-emerald-50 text-emerald-600'
                              : 'bg-rose-50 text-rose-600'
                          }`}
                        >
                          {notification.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-slate-50 px-4 py-7 text-center">
              <div>
                <p className="text-[15px] font-semibold text-slate-700">No notifications</p>
                <p className="mt-1 text-sm text-slate-500">New friend requests will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
