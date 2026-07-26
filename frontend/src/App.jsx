import { useState, useEffect } from "react";
import { Container, Typography, Box, Alert } from "@mui/material";
import { gearApi } from "./api/gearApi";
import GearForm from "./components/GearForm";
import GearList from "./components/GearList";
import "./App.css"; 

export default function App() {
  const [gear, setGear] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // read
  const fetchGear = async () => {
    try {
      setLoading(true);
      const data = await gearApi.getGear();
      setGear(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // render on pageload
  useEffect(() => {
    fetchGear();
  }, []);

  // create
  const handleAddGear = async (newItemData) => {
    const createdItem = await gearApi.createGear(newItemData);
    setGear((prev) => [createdItem, ...prev]);
  };

  // toggle packed or unpacked
  const handleTogglePacked = async (id, is_packed) => {
    const updatedItem = await gearApi.updateGear(id, { is_packed });
    setGear((prev) =>
      prev.map((item) => (item.id === id ? updatedItem : item)),
    );
  };

  // update
  const handleUpdateGear = async (id, updatedFields) => {
    const updatedItem = await gearApi.updateGear(id, updatedFields);
    setGear((prev) =>
      prev.map((item) => (item.id === id ? updatedItem : item)),
    );
  };

  // delete
  const handleDeleteGear = async (id) => {
    try {
      await gearApi.deleteGear(id);
      setGear((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(`Error deleting gear: ${err.message}`);
    }
  };

  return (
    <Container maxWidth="md" className="app-container" sx={{ py: 4 }}>
      <Box
        component="header"
        className="app-header"
        sx={{ mb: 4, textAlign: "center" }}
      >
        <Typography
          variant="h3"
          component="h1"
          className="app-title"
          sx={{ fontWeight: 700, color: "#1e40af" }}
        >
          Gear Check
        </Typography>
      </Box>
{/* display error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <main>
        <GearForm onGearAdded={handleAddGear} />
        <GearList
          gear={gear}
          onTogglePacked={handleTogglePacked}
          onUpdateGear={handleUpdateGear}
          onDeleteGear={handleDeleteGear}
          loading={loading}
        />
      </main>
    </Container>
  );
}
