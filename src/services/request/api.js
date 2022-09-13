import service from "./index";

export const postAccessWithEpic = async (token) =>
  service.post(`/api/auth/oauth/epic`, { token: token });

export const getUserFirstName = async () => service.get(`/api/user/firstname`);

export const getUserPoints = async () => service.get(`/api/user/points`);

export const getUserRewards = async () => service.get(`/api/user/rewards`);

export const getUserDashboardMetrics = async () =>
  service.get(`/api/user/dashboard/metrics`);

export const getLandingPageActivties = async () => service.get(`/api/landing/`);

export const getUserActivityRecomendations = async () =>
  service.get(`/api/activity/recommendation`);

export const getUserActivities = async (type) =>
  service.get(`/api/activity/?type=${type}`);

export const getActivityDetail = async (id) =>
  service.get(`/api/activity/${id}`);

export const postSaveActivity = async (id) =>
  service.post(`/api/activity/save`, { id: id });

export const postDislikeActivity = async (id) =>
  service.post(`/api/activity/dislike`, { id: id });

export const postStartActivity = async (id) =>
  service.post(`/api/activity/start`, { id: id });

export const postFinishActivity = async (id) =>
  service.post(`/api/activity/finish`, { id: id });

export const getAllRewards = async () => service.get(`/api/reward/`);

export const postRedeemReward = async (id) =>
  service.post(`/api/reward/redeem`, { id: id });
