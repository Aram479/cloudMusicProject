import zpRequest from "../index";

enum loginAPI {
  phoneUrl = "/login/cellphone", //手机号登录
  loginStatusUrl = "/login/status", //登录状态
  refreshLoginUrl = "/login/refresh", //刷新登录
  logoutUrl = "/logout", //退出登录
}
/* 手机登录 */
export function getPhone(params: any) {
  return zpRequest.get({
    url: loginAPI.phoneUrl,
    params: params,
  });
}

/* 登录状态 */
export function getLoginStatus() {
  return zpRequest.get({
    url: loginAPI.loginStatusUrl,
  });
}

/* 刷新登录 */
export function getRefreshLogin() {
  return zpRequest.get({
    url: loginAPI.refreshLoginUrl,
  });
}

/* 退出登录 */
export function getLogout() {
  return zpRequest.get({
    url: loginAPI.logoutUrl,
  });
}
