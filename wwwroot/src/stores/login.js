import { atom, onMount, task } from "../../vendor/js/bundle.js";
import * as loginApi from "../api/login.js";
import { loadUsers } from "./users.js";

export const login = atom(false);

onMount(login, () => {
  loadLogin();
});

export function loadLogin() {
  return new Promise((resolve, reject) => {
    task(async () => {
      const [success, info] = await loginApi.getLoginInfo();
      if (success) {
        await loadUsers();
        resolve(login.set(info));
      } else {
        reject(info);
      }
    });
  });
}

export function logIn(username, password) {
  return new Promise((resolve, reject) => {
    task(async () => {
      const [success, u] = await loginApi.logIn(username, password);
      if (success) {
        await loadUsers();
        resolve(login.set(u));
      } else {
        reject(u);
      }
    });
  });
}

export function logOut() {
  task(async () => {
    const [success] = await loginApi.logOut();
    if (success) login.set(false);
  });
}
