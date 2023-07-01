import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState } from 'react';
import PageTitle from 'src/components/PageTitle';
import Footer from 'src/components/Footer';
import {
  Grid,
  Tab,
  Tabs,
  Divider,
  Container,
  Card,
  Box,
  useTheme,
  styled
} from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import TaskSearch from 'src/content/Dashboards/Tasks/TaskSearch';


function DashboardTasks() {

  return (
    <>
      <Head>
        <title>Tasks Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Address Explorer"
          subHeading="Freely provided by TurtleDAO."
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Card variant="outlined">
          <Grid item xs={12}>
            <Box p={4}>
              <TaskSearch />
            </Box>
          </Grid>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;