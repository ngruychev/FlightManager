export default {
  async get(endpoint) {
    const res = await fetch(endpoint);
    try {
      return [res.status < 400, await res.json()];
    } catch {
      return [false];
    }
  },
  async post(endpoint, data) {
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      return [res.status < 400, await res.json()];
    } catch {
      return [false];
    }
  },
  async put(endpoint, data) {
    const res = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return [res.status < 400];
  },
  async delete(endpoint) {
    const res = await fetch(endpoint, {
      method: "DELETE",
    });
    return [res.status < 400];
  },
};
