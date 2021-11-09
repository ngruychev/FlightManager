import { atom, onMount, task } from "../../vendor/js/bundle.js";
import * as usersApi from "../api/user.js";

export const users = atom([]);

onMount(users, () => {
  loadUsers();
});

export function loadUsers() {
  return new Promise((resolve, reject) => {
    task(async () => {
      const [success, f] = await usersApi.getUsers();
      if (success) resolve(users.set(f));
      else reject(f);
    });
  });
}

export function deleteUser({ id }) {
  return new Promise((resolve, reject) => {
    task(async () => {
      const [success] = await usersApi.deleteUser(id);
      if (success) {
        users.set(users.get().filter((u) => u.id !== id));
        resolve();
      } else {
        reject();
      }
    });
  });
}

export function changePassword(user, password) {
  return new Promise((resolve, reject) => {
    task(async () => {
      const [success] = await usersApi.updateUser(user.id, {
        ...user,
        password,
      });
      if (success) resolve();
      else reject();
    });
  });
}
