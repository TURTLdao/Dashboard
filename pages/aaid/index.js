import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState } from 'react';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
} from '@mui/material';
import Footer from 'src/components/Footer';

import ListedProjects from 'src/page-content/aaid/listed-projects'

function AAIDindex() {

  return (
    <>
      <Head>
        <title>Supported Projects - TurtleDAO Platform</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="TurtleDAO Supported Projects"
          subHeading="Discover hidden gems within the Cardano blockchain, supported by TurtleDAO."
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <ListedProjects/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

AAIDindex.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default AAIDindex;