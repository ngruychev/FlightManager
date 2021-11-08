import { createRouter } from "../../vendor/js/bundle.js";

export const router = createRouter({
  home: "/",
  flights: "/flights",
  flight: "/flight/:id",
  reservations: "/reservations",
  reservation: "/reservation/:id",
  login: "/login",
  "404": "/404",
  makeReservation: "/make-reservation/:id",
});
