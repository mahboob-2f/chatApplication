import React, { lazy, useEffect, useMemo, useState } from 'react';
import { Outlet, matchPath, useLocation } from 'react-router';
import { HiOutlineChevronRight } from 'react-icons/hi2';
import Title from '../shared/Title';
import ChatList from './ChatList';
import Profile from '../shared/Profile';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

const chats = [
  {
    id: 'alex-design',
    name: 'Alex Morgan',
    avatar: 'AM',
    type: 'direct',
    time: '2m',
    unread: 2,
    lastMessage: 'I shared the new onboarding screens for review.',
    role: 'Product Designer',
    about: 'Focuses on polished UI systems, motion details, and consistent component behavior.',
    statusColor: 'bg-emerald-400',
  },
  {
    id: 'launch-squad',
    name: 'Launch Squad',
    avatar: 'LS',
    type: 'group',
    time: '12m',
    unread: 6,
    lastMessage: 'Standup moved to 4:30 PM. Please drop blockers here.',
    role: 'Cross-functional Group',
    about: 'Planning space for product, design, and engineering as features move toward release.',
    statusColor: 'bg-cyan-300',
  },
  {
    id: 'mira-support',
    name: 'Mira Patel',
    avatar: 'MP',
    type: 'direct',
    time: '35m',
    unread: 0,
    lastMessage: 'Can you help review the latest support flow copy?',
    role: 'Customer Success Lead',
    about: 'Keeps customer-facing comms clear, calm, and fast across support operations.',
    statusColor: 'bg-amber-300',
  },
  {
    id: 'dev-circle',
    name: 'Dev Circle',
    avatar: 'DC',
    type: 'group',
    time: '1h',
    unread: 3,
    lastMessage: 'Backend API is ready for the next round of chat integration.',
    role: 'Engineering Group',
    about: 'Shared engineering room for feature updates, blockers, and release coordination.',
    statusColor: 'bg-violet-300',
  },
];

const AppLayout = () => {
  const location = useLocation();
  const [isMobileChatListOpen, setIsMobileChatListOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  return (
    <div className="h-[100dvh] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(251,113,133,0.22),_transparent_32%),linear-gradient(180deg,_#0f172a_0%,_#111827_100%)]">
      <Title title="Home | Chat App" description="Chat App home page" />
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col overflow-hidden px-2 py-2 sm:px-3 sm:py-3 lg:px-4 lg:py-3.5">

        {/*  header component */}
        <Header />


        <div className="mt-2.5 flex min-h-0 flex-1 flex-col gap-2.5 sm:mt-3 sm:gap-3 xl:grid xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="min-h-0 overflow-hidden rounded-[18px] border border-white/10 bg-white/5 p-3 text-slate-300 shadow-2xl shadow-black/20 sm:p-3.5 xl:rounded-[20px] xl:p-3.5">
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

          <div className={`grid min-h-0 gap-2.5 sm:gap-3 ${isProfileOpen && selectedChat ? 'xl:grid-cols-[minmax(0,1fr)_250px]' : ''}`}>
            <main className="min-h-0 overflow-hidden rounded-[18px] border border-white/10 bg-slate-950/60 p-3 shadow-2xl shadow-black/25 backdrop-blur sm:p-3.5 lg:rounded-[20px]">
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
              <aside className="min-h-0 overflow-hidden rounded-[18px] border border-white/10 bg-white/5 p-3 text-slate-300 shadow-2xl shadow-black/20 sm:p-3.5 xl:rounded-[20px]">
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


