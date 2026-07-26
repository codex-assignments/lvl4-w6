const API_BASE_URL = "http://localhost:5000/api";

export const gearApi = {
  // read
  async getGear() {
    const res = await fetch(`${API_BASE_URL}/gear`);
    if (!res.ok) throw new Error("Failed to fetch gear items.");
    return res.json();
  },

  // create
  async createGear(gearData) {
    const res = await fetch(`${API_BASE_URL}/gear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gearData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to create gear item.");
    return data;
  },

  // update
  async updateGear(id, updatedFields) {
    const res = await fetch(`${API_BASE_URL}/gear/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to update gear item.");
    return data;
  },

  // delete 
  async deleteGear(id) {
    const res = await fetch(`${API_BASE_URL}/gear/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) throw new Error("Failed to delete gear item.");
    return data;
  },
};
