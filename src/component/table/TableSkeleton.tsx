"use client";
import { Box, CircularProgress, Skeleton } from "@mui/material";

export default function TableSkeleton() {
  return (
    <Box sx={{ display: 'flex', justifyContent: "center", marginTop: 30}}>
      <CircularProgress sx={{color: "#4bb58c"}} />
    </Box>
  );
}
