import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Box,
  Chip,
  TextField,
  Button,
  Stack,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const CATEGORIES = [
  "General",
  "Shelter",
  "Bedding",
  "Cooking",
  "Clothing",
  "Electronics",
  "First Aid",
];

export default function GearItem({
  item,
  onTogglePacked,
  onUpdateGear,
  onDeleteGear,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    item_name: item.item_name,
    category: item.category,
    quantity: item.quantity,
    notes: item.notes || "",
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await onUpdateGear(item.id, {
      ...editForm,
      quantity: Number(editForm.quantity),
    });
    setIsEditing(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        backgroundColor: item.is_packed ? "#f8fafc" : "#ffffff",
        borderColor: item.is_packed ? "#cbd5e1" : "#e2e8f0",
        transition: "all 0.2s ease",
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        {isEditing ? (
          //   while editing
          <Stack spacing={1.5}>
            <TextField
              size="small"
              name="item_name"
              label="Item Name"
              value={editForm.item_name}
              onChange={handleEditChange}
              fullWidth
            />
            <Stack direction="row" spacing={1}>
              <FormControl size="small" fullWidth>
                <Select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                >
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                size="small"
                type="number"
                name="quantity"
                label="Qty"
                value={editForm.quantity}
                onChange={handleEditChange}
                sx={{ width: 90 }}
              />
            </Stack>
            <TextField
              size="small"
              name="notes"
              label="Notes"
              value={editForm.notes}
              onChange={handleEditChange}
              fullWidth
            />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button
                size="small"
                startIcon={<CancelIcon />}
                onClick={() => setIsEditing(false)}
                color="inherit"
              >
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        ) : (
          // display
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <Checkbox
              checked={item.is_packed}
              onChange={(e) => onTogglePacked(item.id, e.target.checked)}
              color="primary"
              sx={{ p: 0.5, mt: 0.2 }}
            />

            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    textDecoration: item.is_packed ? "line-through" : "none",
                    color: item.is_packed ? "#64748b" : "#0f172a",
                  }}
                >
                  {item.item_name}
                </Typography>
                <Chip
                  label={item.category}
                  size="small"
                  sx={{
                    fontSize: "0.7rem",
                    height: 20,
                    backgroundColor: "#e0e7ff",
                    color: "#3730a3",
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Typography variant="body2" sx={{ color: "#475569" }}>
                Quantity: <strong>{item.quantity}</strong>
              </Typography>

              {item.notes && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 0.5,
                    color: "#64748b",
                    fontStyle: "italic",
                  }}
                >
                  "{item.notes}"
                </Typography>
              )}
            </Box>

            <Stack direction="row" spacing={0.5}>
              <IconButton
                size="small"
                onClick={() => setIsEditing(true)}
                title="Edit item"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => onDeleteGear(item.id)}
                title="Delete item"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
