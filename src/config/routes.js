import Home from "../pages/Home";
import Login from "../pages/Login";
import UserCenter from "../pages/UserCenter";
import Dashboard from "../pages/UserCenter/Dashboard";
import Ranking from "../pages/UserCenter/Ranking";
import Recommendation from "../pages/UserCenter/Recommendation";
import Records from "../pages/UserCenter/Records";
import NotFound from "../pages/Error/NotFound";
import Redirect from "../pages/Redirect";
import Rewards from "../pages/UserCenter/Rewards";

const mainRoutes = [
  { path: "/", loginRequired: false, component: Home, exact: true },
  { path: "/login", loginRequired: false, component: Login, exact: true },
  { path: "/redirect", loginRequired: false, component: Redirect, exact: true },
  {
    path: "/user",
    loginRequired: true,
    // loginRequired: false, // DEBUG ONLY!
    component: UserCenter,
    exact: false,
  },
  {
    path: "/404",
    loginRequired: false,
    component: NotFound,
    exact: true,
  },
];

export const userCenterRoutes = [
  {
    path: "/user/dashboard",
    component: Dashboard,
  },
  {
    path: "/user/activities",
    component: Recommendation,
  },
  {
    path: "/user/ranking",
    component: Ranking,
  },
  {
    path: "/user/records",
    component: Records,
  },
  {
    path: "/user/rewards",
    component: Rewards,
  },
];

export default mainRoutes;
