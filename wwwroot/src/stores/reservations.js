import { atom, onMount, task } from "../../vendor/js/bundle.js";
import * as reservationApi from "../api/reservation.js";
import { loadFlights } from "./flights.js";

export const reservations = atom([]);

onMount(reservations, () => {
  loadReservations();
});

export function loadReservations() {
  return new Promise((resolve, reject) => {
    task(async () => {
      const [success, rs] = await reservationApi.getReservations();
      if (success) resolve(reservations.set(rs));
      else reject(rs);
    });
  });
}

export function makeReservation(reservation) {
  return new Promise((resolve, reject) => {
    task(async () => {
      const [success, r] = await reservationApi.createReservation(reservation);
      if (success) {
        reservations.set([...reservations.get(), r]);
        await loadFlights();
        resolve(r);
      } else {
        reject(r);
      }
    });
  });
}
