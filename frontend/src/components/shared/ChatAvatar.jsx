import React from 'react';
import { FaUserGroup } from 'react-icons/fa6';

const sizeClasses = {
  sm: 'h-10 w-10 text-xs sm:h-11 sm:w-11',
  md: 'h-11 w-11 text-sm sm:h-12 sm:w-12',
  lg: 'h-16 w-16 text-xl',
};

const iconSizeClasses = {
  sm: 'text-base sm:text-lg',
  md: 'text-lg sm:text-xl',
  lg: 'text-2xl',
};

const ChatAvatar = ({ chat, size = 'md', className = '' }) => {
  const isGroup = chat?.type === 'group';

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 font-semibold text-slate-950 shadow-lg shadow-cyan-950/15 ${sizeClasses[size]} ${className}`.trim()}
      aria-label={isGroup ? `${chat.name} group chat` : `${chat.name} avatar`}
    >
      {isGroup ? <FaUserGroup className={iconSizeClasses[size]} /> : chat.avatar}
    </div>
  );
};

export default ChatAvatar;
