import { atom, onMount, task } from "../../vendor/js/bundle.js";
import * as flightsApi from "../api/flight.js";

export const flights = atom([]);

onMount(flights, () => {
  loadFlights();
});

export function loadFlights() {
  return new Promise((resolve, reject) => {
    task(async () => {
      const [success, f] = await flightsApi.getFlights();
      if (success) resolve(flights.set(f));
      else reject(f);
    });
  });
}

export function createFlight(flight) {
  return new Promise((resolve, reject) => {
    task(async () => {
      const [success, f] = await flightsApi.createFlight(flight);
      if (success) {
        flights.set([...flights.get(), f]);
        resolve(f);
      } else {
        reject(f);
      }
    });
  });
}
