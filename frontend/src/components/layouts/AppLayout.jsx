import React, { lazy, useEffect, useMemo, useState } from 'react';
import { Outlet, matchPath, useLocation } from 'react-router';
import { HiOutlineChevronRight } from 'react-icons/hi2';
import { FaLeftRight } from 'react-icons/fa6';
import Title from '../shared/Title';
import ChatList from './ChatList';
import Profile from '../shared/Profile';
import { chats } from '../../constants/chats';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));
const SIDEBAR_MIN_WIDTH = 240;
const SIDEBAR_MAX_WIDTH = 420;
const PROFILE_MIN_WIDTH = 220;
const PROFILE_MAX_WIDTH = 360;

const AppLayout = () => {
  const location = useLocation();
  const [isMobileChatListOpen, setIsMobileChatListOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [profileWidth, setProfileWidth] = useState(300);
  const [activeResize, setActiveResize] = useState(null);

  const routeMatch = matchPath('/chat/:chatId', location.pathname);
  const activeChatId = routeMatch?.params?.chatId ?? null;
  const selectedChat = useMemo(
    () => chats.find((chat) => chat.id === activeChatId) ?? null,
    [activeChatId]
  );

  useEffect(() => {
    if (!selectedChat) {
      setIsProfileOpen(false);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (!activeResize) return undefined;

    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (event) => {
      if (activeResize.panel === 'sidebar') {
        const nextWidth = activeResize.startWidth + (event.clientX - activeResize.startX);
        setSidebarWidth(Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, nextWidth)));
        return;
      }

      const nextWidth = activeResize.startWidth - (event.clientX - activeResize.startX);
      setProfileWidth(Math.min(PROFILE_MAX_WIDTH, Math.max(PROFILE_MIN_WIDTH, nextWidth)));
    };

    const handleMouseUp = () => setActiveResize(null);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeResize]);

  const startResize = (panel) => (event) => {
    event.preventDefault();
    setActiveResize({
      panel,
      startX: event.clientX,
      startWidth: panel === 'sidebar' ? sidebarWidth : profileWidth,
    });
  };

  return (
    <div className="h-[100dvh] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(251,113,133,0.22),_transparent_32%),linear-gradient(180deg,_#0f172a_0%,_#111827_100%)]">
      <Title title="Home | Chat App" description="Chat App home page" />
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col overflow-hidden px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-3.5">

        {/*  header component */}
        <Header />


        <div
          className="mt-2.5 flex min-h-0 flex-1 flex-col gap-2.5 sm:mt-3 sm:gap-3 xl:flex xl:flex-row xl:items-stretch xl:gap-0"
          style={{
            '--sidebar-width': `${sidebarWidth}px`,
            '--profile-width': `${profileWidth}px`,
          }}
        >
          <aside
            className="resize-panel min-h-0 overflow-hidden rounded-[18px] border border-white/10 bg-white/5 p-3 text-slate-300 shadow-2xl shadow-black/20 sm:p-3.5 xl:w-[var(--sidebar-width)] xl:rounded-[20px] xl:p-3.5 xl:shrink-0"
          >
            <div className="flex items-center justify-between gap-3 xl:hidden">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-100/80">
                  Sidebar
                </p>
                <h2 className="mt-1 text-base font-semibold text-white">Chats</h2>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileChatListOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
              >
                {isMobileChatListOpen ? 'Hide' : 'Show'}
                <HiOutlineChevronRight className={`text-sm transition-transform ${isMobileChatListOpen ? 'rotate-90' : ''}`} />
              </button>
            </div>

            <div className={`min-h-0 ${isMobileChatListOpen ? 'mt-3 block' : 'hidden'} xl:mt-0 xl:block xl:h-full`}>
              <ChatList
                chats={chats}
                activeChatId={activeChatId}
                onChatSelect={() => setIsMobileChatListOpen(false)}
              />
            </div>
          </aside>

          <div className="hidden xl:flex xl:w-3 xl:shrink-0 xl:items-center xl:justify-center">
            <button
              type="button"
              aria-label="Resize chat list"
              onMouseDown={startResize('sidebar')}
              className={`resize-handle group relative h-full w-3 cursor-ew-resize rounded-full ${
                activeResize?.panel === 'sidebar' ? 'bg-cyan-300/15' : 'bg-transparent hover:bg-cyan-300/10'
              }`}
            >
              <span className="mx-auto block h-full w-[2px] rounded-full bg-white/15" />
              <span
                className={`pointer-events-none absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/90 text-[11px] text-cyan-100 shadow-lg shadow-black/25 ${
                  activeResize?.panel === 'sidebar' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                <FaLeftRight />
              </span>
            </button>
          </div>

          <div className="grid min-h-0 flex-1 gap-2.5 sm:gap-3 xl:flex xl:min-w-0 xl:flex-row xl:gap-0">
            <main className="min-h-0 overflow-hidden rounded-[18px] border border-white/10 bg-slate-950/60 p-3 shadow-2xl shadow-black/25 backdrop-blur sm:p-3.5 lg:rounded-[20px] xl:min-w-0 xl:flex-1">
              <Outlet
                context={{
                  chats,
                  selectedChat,
                  isProfileOpen,
                  openProfile: () => setIsProfileOpen(true),
                  closeProfile: () => setIsProfileOpen(false),
                  toggleProfile: () => setIsProfileOpen((prev) => !prev),
                }}
              />
            </main>

            {isProfileOpen && selectedChat && (
              <div className="hidden xl:flex xl:w-3 xl:shrink-0 xl:items-center xl:justify-center">
                <button
                  type="button"
                  aria-label="Resize profile panel"
                  onMouseDown={startResize('profile')}
                  className={`resize-handle group relative h-full w-3 cursor-ew-resize rounded-full ${
                    activeResize?.panel === 'profile' ? 'bg-cyan-300/15' : 'bg-transparent hover:bg-cyan-300/10'
                  }`}
                >
                  <span className="mx-auto block h-full w-[2px] rounded-full bg-white/15" />
                  <span
                    className={`pointer-events-none absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-900/90 text-[11px] text-cyan-100 shadow-lg shadow-black/25 ${
                      activeResize?.panel === 'profile' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <FaLeftRight />
                  </span>
                </button>
              </div>
            )}

            {isProfileOpen && selectedChat && (
              <aside
                className="resize-panel min-h-0 overflow-hidden rounded-[18px] border border-white/10 bg-white/5 p-3 text-slate-300 shadow-2xl shadow-black/20 sm:p-3.5 xl:w-[var(--profile-width)] xl:shrink-0 xl:rounded-[20px]"
              >
                <div className="mb-2.5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-100/80">
                      Profile
                    </p>
                    <h2 className="mt-1 text-base font-semibold text-white">Contact Details</h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsProfileOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/8 px-2.5 py-1.5 text-[11px] font-medium text-white transition-all duration-200 hover:bg-white/15"
                  >
                    Close
                  </button>
                </div>

                <Profile chat={selectedChat} />
              </aside>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;


