import { atom, onMount, task } from "../../vendor/js/bundle.js";
import * as reservationApi from "../api/reservation.js";

export const reservations = atom([]);

onMount(reservations, () => {
  loadReservations();
});

export function loadReservations() {
  return new Promise((resolve, reject) => {
    task(async () => {
      const [success, f] = await reservationApi.getReservations();
      if (success) resolve(reservations.set(f));
      else reject(f);
    });
  });
}
