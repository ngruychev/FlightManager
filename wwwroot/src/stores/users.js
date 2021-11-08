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
