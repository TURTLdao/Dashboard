import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useState, useEffect } from 'react';

import Slider from "react-slick";
import { fetchTTdata } from 'src/api/fetch-calls';

import { VersionBanner } from 'src/components/banners/version';


export default function Page({  }) {

  return (
  <>
    <Head>
      <title>
        Dashboard | TurtleDAO Platform
      </title>
    </Head>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        background: '#1d1d1d',
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
        <div align='center' style={{ width: '100%' }}>
          <Grid
            xs={12}
            sm={12}
            lg={8}
          >
            <div align='center'>
            <VersionBanner
              sx={{ width: '75%' }}
            /></div>
          </Grid></div>


          <Grid
            xs={12}
            sm={4}
            lg={4}
          >
            
          </Grid>

          <Grid
            xs={12}
            sm={4}
            lg={8}
          >
            
            
          </Grid>

        </Grid>
      </Container>
    </Box>
  </>
  );
};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

