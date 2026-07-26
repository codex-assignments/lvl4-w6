import { Typography, Box, Grid, LinearProgress, Paper } from "@mui/material";
import GearItem from "./GearItem";

export default function GearList({
  gear,
  onTogglePacked,
  onUpdateGear,
  onDeleteGear,
  loading,
}) {
  if (loading) {
    return (
      <Typography sx={{ textAlign: "center", color: "#64748b", py: 4 }}>
        Loading gear list...
      </Typography>
    );
  }

  if (gear.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: "center",
          backgroundColor: "#f8fafc",
          borderRadius: 2,
        }}
      >
        <Typography variant="body1" sx={{ color: "#64748b" }}>
          No gear items added yet! Add your first item above.
        </Typography>
      </Paper>
    );
  }

  const packedCount = gear.filter((i) => i.is_packed).length;
  const progressPercent = Math.round((packedCount / gear.length) * 100);

  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#0f172a" }}>
            Packing Progress
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "#2563eb" }}
          >
            {packedCount} / {gear.length} Packed ({progressPercent}%)
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      <Grid container spacing={2}>
        {gear.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <GearItem
              item={item}
              onTogglePacked={onTogglePacked}
              onUpdateGear={onUpdateGear}
              onDeleteGear={onDeleteGear}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
