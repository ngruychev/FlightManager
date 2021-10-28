import { atom, onMount, task } from "../../vendor/js/bundle.js";
import * as loginApi from "../api/login.js";

export const user = atom(false);

onMount(user, () => {
  loadUser();
});

export function loadUser() {
  return new Promise((resolve, reject) => {
    task(async () => {
      const [success, info] = await loginApi.getLoginInfo();
      if (success) resolve(user.set(info));
      else reject(info);
    });
  });
}

export function logIn(username, password) {
  return new Promise((resolve, reject) => {
    task(async () => {
      const [success, u] = await loginApi.logIn(username, password);
      if (success) resolve(user.set(u));
      else reject(u);
    });
  });
}

export function logOut() {
  task(async () => {
    const [success] = await loginApi.logOut();
    if (success) user.set(false);
  });
}
