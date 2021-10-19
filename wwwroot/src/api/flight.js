import helper from "./helper.js";

const endpoint = "/api/Flight";

export const getFlights = () => helper.get(endpoint);
export const createFlight = (flight) => helper.post(endpoint, flight);
export const getFlightById = (id) => helper.get(`${endpoint}/${id}`);
export const updateFlight = (id, flight) =>
  helper.put(`${endpoint}/${id}`, flight);
export const deleteFlight = (id) => helper.delete(`${endpoint}/${id}`);
