import helper from "./helper.js";

const endpoint = "/api/Reservation";

export const getReservations = () => helper.get(endpoint);
export const createReservation = (reservation) =>
  helper.post(endpoint, reservation);
export const getReservationById = (id) => helper.get(`${endpoint}/${id}`);
export const updateReservation = (id, reservation) =>
  helper.put(`${endpoint}/${id}`, reservation);
export const deleteReservation = (id) => helper.delete(`${endpoint}/${id}`);

const TicketType = {};
TicketType[TicketType["Economy"] = 0] = "Economy";
TicketType[TicketType["Business"] = 1] = "Business";
export { TicketType };
