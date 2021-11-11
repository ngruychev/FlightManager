import { createRouter } from "../../vendor/js/bundle.js";

export const router = createRouter({
  home: "/",
  flights: "/flights",
  flight: "/flight/:id",
  reservations: "/reservations",
  reservation: "/reservation/:id",
  login: "/login",
  users: "/users",
  user: "/user/:id",
  "404": "/404",
  makeReservation: "/make-reservation/:id",
  createUser: "/create-user",
  createFlight: "/create-flight",
});
