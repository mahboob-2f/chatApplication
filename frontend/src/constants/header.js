import {
  HiOutlineBell,
  HiOutlinePlus,
  HiOutlineUserCircle,
} from 'react-icons/hi2';
import { IoSearchOutline } from 'react-icons/io5';

export const actionButtons = [
  { id: 'search', label: 'Search', icon: IoSearchOutline },
  { id: 'new', label: 'New', icon: HiOutlinePlus },
  { id: 'notifications', label: 'Notifications', icon: HiOutlineBell },
  { id: 'profile', label: 'Profile', icon: HiOutlineUserCircle },
];
