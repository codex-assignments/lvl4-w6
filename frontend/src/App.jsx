import { Container, Typography, Box, Alert } from "@mui/material";
import { gearApi } from "./api/gearApi";
import GearForm from "./components/GearForm";
import GearList from "./components/GearList";
import "./App.css"; 

export default function App() {

  return (
    <Container maxWidth="md" className="app-container">
      <Box component="header" className="app-header">
        <Typography variant="h3" component="h1" className="app-title">
          Gear Checker
        </Typography>
      </Box>

      <main>
        <GearForm />
        <GearList />
      </main>
    </Container>
  );
}
