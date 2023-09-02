// src/MainPage.js
import React from 'react';
import { Grid, CssBaseline } from '@mui/material';
import Dashboard from './components/Dashboard';
import Sidebar from '../Sidebar'

function MainPage() {
  return (
    <Grid container>
      <CssBaseline />
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <Dashboard />
      </Grid>
    </Grid>
  );
}

export default MainPage;
