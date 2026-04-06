import { dummyUsers } from './users';

export const groups = [
  {
    id: 'group-1',
    name: 'Design Team',
    members: [dummyUsers[0], dummyUsers[2], dummyUsers[4]],
  },
  {
    id: 'group-2',
    name: 'Frontend Squad',
    members: [dummyUsers[1], dummyUsers[2], dummyUsers[3]],
  },
  {
    id: 'group-3',
    name: 'Project Updates',
    members: [dummyUsers[0], dummyUsers[1], dummyUsers[3], dummyUsers[4]],
  },
  {
    id: 'group-4',
    name: 'Community Lounge',
    members: [dummyUsers[1], dummyUsers[2], dummyUsers[4]],
  },
];
