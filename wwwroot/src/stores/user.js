import { createStore, effect } from "../../vendor/js/bundle.js";
import * as loginApi from "../api/login.js";

export const user = createStore(() => {
  user.set(false);
  effect(async () => {
    const [success, info] = await loginApi.getLoginInfo();
    if (success) user.set(info);
  });
});

export function logIn(username, password) {
  return new Promise((_, reject) => {
    effect(async () => {
      const [success, u] = await loginApi.logIn(username, password);
      if (success) user.set(u);
      else reject(u);
    });
  });
}

export function logOut() {
  effect(async () => {
    const [success] = await loginApi.logOut();
    if (success) user.set(false);
  });
}
