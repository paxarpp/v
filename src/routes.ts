import type { RouteConfig } from '@react-router/dev/routes';

export default [
  {
    path: '/',
    file: './pages/main/index.tsx',
  },
  {
    path: '/about',
    file: './pages/about/index.tsx',
  },
  {
    path: '/beachCoaches',
    file: './pages/coaches/index.tsx',
  },
  {
    path: '/classicCoaches',
    file: './pages/coaches/classic.tsx',
  },
  {
    path: '/weekendCamps',
    file: './pages/shortCamps/index.tsx',
  },
  {
    path: '/camps/:id',
    file: './pages/camp/index.tsx',
  },
  {
    path: '/longCamps',
    file: './pages/longCamps/index.tsx',
  },
  {
    path: '/trainingSchedule',
    file: './pages/trainingSchedule/index.tsx',
  },
  {
    path: '/oldCamps',
    file: './pages/pastCamps/index.tsx',
  },
  {
    path: '/tournaments',
    file: './pages/tournaments/index.tsx',
  },
  {
    path: '/corporates',
    file: './pages/corporates/index.tsx',
  },
  {
    path: '/user/:id',
    file: './pages/user/index.tsx',
  },
] satisfies RouteConfig;
