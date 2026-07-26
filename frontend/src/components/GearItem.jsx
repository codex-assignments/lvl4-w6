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

export default function GearItem({ item }) {
  const { updateResource, deleteResource } = useResources();
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

  const handleToggle = (e) => {
    updateResource(item.id, { is_packed: e.target.checked });
  };

  const handleSave = async () => {
    await updateResource(item.id, {
      ...editForm,
      quantity: Number(editForm.quantity),
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteResource(item.id);
  };

  return (
    <Card
      variant="outlined"
      className={`gear-item-card ${item.is_packed ? "packed" : "unpacked"}`}
    >
      <CardContent className="gear-item-content">
        {isEditing ? (
          /* editing */
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
                className="edit-qty-input"
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
            <Box className="edit-actions-row">
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
            </Box>
          </Stack>
        ) : (
          /* display */
          <Box className="gear-item-display-box">
            <Checkbox
              checked={item.is_packed}
              onChange={handleToggle}
              color="primary"
              className="gear-item-checkbox"
            />

            <Box className="gear-item-details">
              <Box className="gear-item-header">
                <Typography
                  variant="subtitle1"
                  className={`gear-item-title ${item.is_packed ? "packed" : ""}`}
                >
                  {item.item_name}
                </Typography>
                <Chip
                  label={item.category}
                  size="small"
                  className="gear-item-chip"
                />
              </Box>

              <Typography variant="body2" className="gear-item-qty">
                Quantity: <strong>{item.quantity}</strong>
              </Typography>

              {item.notes && (
                <Typography variant="caption" className="gear-item-notes">
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
                onClick={handleDelete}
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
