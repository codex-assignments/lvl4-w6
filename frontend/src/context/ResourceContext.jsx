import React, { createContext, useContext, useState, useEffect } from "react";

// 1. create a context
const ResourceContext = createContext(null);

// 2. component called a provider
export function ResourceProvider({ children }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND = import.meta.env.VITE_BACKEND;

  //  create
  async function addResource(newItem) {
    const res = await fetch(BACKEND, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
    const createdItem = await res.json();
    if (!res.ok) throw new Error("Failed to add item.");
    setResources((prev) => [createdItem, ...prev]);
  }

  // read
  async function loadResources() {
    setLoading(true);
    const res = await fetch(BACKEND);
    const data = await res.json();
    setResources(data);
    setLoading(false);
  }

  // update
    async function updateResource(id, updatedData) {
        const res = await fetch(`${BACKEND}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        });
        const updatedItem = await res.json();
        if (!res.ok) throw new Error("Failed to update item.");
        setResources((prev) =>
            prev.map((item) => (item.id === id ? updatedItem : item)),
        );
    }

  // delete
  async function deleteResource(id) {
    const res = await fetch(BACKEND + `/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete item.");
    setResources((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    loadResources();
  }, []);
  return (
      <ResourceContext.Provider value={{
          resources, loading, loadResources, addResource, updateResource, deleteResource
        }}>{children}</ResourceContext.Provider>
    );
    
}


// hook, with useContext on ResourceContext -- start this one with "use" so react can reference it as a hook
export function useResources() {
  return useContext(ResourceContext);
}
