import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  Box,
  Stack,
} from "@mui/material";

const CATEGORIES = [
  "General",
  "Shelter",
  "Bedding",
  "Cooking",
  "Clothing",
  "Electronics",
  "First Aid",
  "Lighting",
];

export default function GearForm({ onGearAdded }) {
  const [formData, setFormData] = useState({
    item_name: "",
    category: "General",
    quantity: 1,
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onGearAdded({
        ...formData,
        quantity: Number(formData.quantity),
      });

      // reset
      setFormData({
        item_name: "",
        category: "General",
        quantity: 1,
        notes: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
          Add Gear
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Item Name"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              placeholder="e.g., 2-Person Tent"
              required
              fullWidth
              size="small"
            />

            <Stack direction="row" spacing={2}>
              <FormControl fullWidth size="small" sx={{ flex: 2 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                slotProps={{ htmlInput: { min: 1 } }}
                size="small"
                sx={{ flex: 1 }}
              />
            </Stack>

            <TextField
              label="Notes (Optional)"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g., Include rainfly and stakes"
              fullWidth
              size="small"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ mt: 1, py: 1.2, fontWeight: 600, textTransform: "none" }}
            >
              {loading ? "Adding..." : "Add Gear Item"}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
