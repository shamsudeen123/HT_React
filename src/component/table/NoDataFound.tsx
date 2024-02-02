import { Grid, Typography } from '@mui/material'
import React from 'react'

function NoDataFound() {
  return (
    <Grid sx={{display: "flex", justifyContent: "center", marginTop: 10}}>
        <Typography variant="h3" sx={{color: '#D5D5D5'}}>No Data Found!</Typography>
    </Grid>
  )
}

export default NoDataFound