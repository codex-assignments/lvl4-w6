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
import { useResources } from "../context/ResourceContext";

const CATEGORIES = [
  "General",
  "Shelter",
  "Bedding",
  "Cooking",
  "Clothing",
  "Electronics",
  "First Aid",
];

export default function GearForm() {
  const { addResource } = useResources();
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
      await addResource({
        ...formData,
        quantity: Number(formData.quantity),
      });

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
    <Card elevation={2} className="form-card">
      <CardContent className="form-content">
        <Typography variant="h6" component="h2" className="form-title">
          Add Gear
        </Typography>

        {error && (
          <Alert severity="error" className="alert-margin">
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
              <FormControl
                fullWidth
                size="small"
                className="form-category-select"
              >
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
                className="form-quantity-input"
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
              className="form-submit-btn"
            >
              {loading ? "Adding..." : "Add Gear Item"}
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
