import { Typography, Box, Grid, LinearProgress, Paper } from "@mui/material";
import { useResources } from "../context/ResourceContext";
import GearItem from "./GearItem";

export default function GearList() {
  const { resources, loading } = useResources();

  if (loading) {
    return (
      <Typography className="loading-text">Loading gear list...</Typography>
    );
  }

  if (resources.length === 0) {
    return (
      <Paper elevation={0} className="empty-list-paper">
        <Typography variant="body1" className="empty-list-text">
          No items added yet.
        </Typography>
      </Paper>
    );
  }
// how many is_packed toggled true
  const packedCount = resources.filter((i) => i.is_packed).length;
  const progressPercent = Math.round((packedCount / resources.length) * 100);

  return (
    <Box className="list-container">
      <Box className="list-header-box">
        <Box className="list-progress-row">
          <Typography variant="h6" className="list-progress-title">
            Packing Progress
          </Typography>
          <Typography variant="body2" className="list-progress-text">
            {packedCount} / {resources.length} Packed ({progressPercent}%)
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          className="list-progress-bar"
        />
      </Box>

      <Grid container spacing={2}>
        {resources.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <GearItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
