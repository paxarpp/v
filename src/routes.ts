import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('./pages/main/index.tsx'),
  route('/about', './pages/about/index.tsx'),
  route('/beachCoaches', './pages/coaches/index.tsx'),
  route('/classicCoaches', './pages/coaches/classic.tsx'),
  route('/weekendCamps', './pages/shortCamps/index.tsx'),
  route('/camps/:id', './pages/camp/index.tsx'),
  route('/camps/past/:id', './pages/camp/past.tsx'),
  route('/longCamps', './pages/longCamps/index.tsx'),
  route('/trainingSchedule', './pages/trainingSchedule/index.tsx'),
  route('/oldCamps', './pages/pastCamps/index.tsx'),
  route('/childCamps', './pages/childCamps/index.tsx'),
  route('/user/:id', './pages/user/index.tsx'),
  route('/agreement', './pages/agreement/index.tsx'),
  route('/persanal', './pages/persanal/index.tsx'),
] satisfies RouteConfig;
