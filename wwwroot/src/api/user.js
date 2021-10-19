import helper from "./helper.js";

const endpoint = "/api/User";

export const getUsers = () => helper.get(endpoint);
export const createUser = (user) => helper.post(endpoint, user);
export const getUserById = (id) => helper.get(`${endpoint}/${id}`);
export const updateUser = (id, user) => helper.put(`${endpoint}/${id}`, user);
export const deleteUser = (id) => helper.delete(`${endpoint}/${id}`);

const UserRole = {};
UserRole[UserRole["Employee"] = 0] = "Employee";
UserRole[UserRole["Admin"] = 1] = "Admin";
export { UserRole };
