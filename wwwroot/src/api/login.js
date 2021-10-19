import helper from "./helper.js";

const endpoint = "/api/Login";

export const getLoginInfo = () => helper.get(endpoint);
export const logIn = (username, password) =>
  helper.post(endpoint, { username, password });
export const logOut = () => helper.delete(endpoint);
