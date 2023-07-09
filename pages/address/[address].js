import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import {
  Container,
  Grid,
  Card,
  Button,
  CardContent,
  Divider, Typography 
} from '@mui/material';
import Footer from 'src/components/Footer';

import AddressCover from 'src/page-content/address/cover'
import AddressStats from 'src/page-content/address/stats'
import RecentTransactionsTable from 'src/page-content/address/recent-txs'
import TokensTable from 'src/page-content/address/tokens'
import NftsView from 'src/page-content/address/nfts'

import { poolpmAddressData, adastatAddressData } from 'src/api/address-data'

const { knownAddresses } = require('src/consts/known/addrs.js');

export async function getServerSideProps(context) {
  const { address } = context.query;

  // Check if the address starts with 'addr'

  try {

    const poolpm_data = await poolpmAddressData(address);
    const adastat_data = await adastatAddressData(address);
    const assets = adastat_data.assets;

    const address_data = { address, poolpm_data, adastat_data }
    return {
      props: {
        address_data, assets
      },
    }
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    // Handle the error gracefully, such as showing a fallback UI or redirecting to an error page
    if (error) {
      return {
        redirect: {
          destination: '/404', // Redirect to the 404 page
          permanent: false, // Set it as a temporary redirect
        },
      };
    }

    return {
      props: {
        error: "An error occurred",
      },
    };
  }
}

function AddressView({ address_data, assets }) {
  const known_addrs = knownAddresses;

  return (
    <>
      <Head>
        <title>Address - TurtleDAO Platform</title>
      </Head>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          sx={{ mt: 2 }}
        >
          <Grid item xs={12} md={8}>
            <AddressCover
              address_data={address_data}
              known_addrs={known_addrs}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AddressStats
              address_data={address_data}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <RecentTransactionsTable
              address_data={address_data}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TokensTable
              address_data={address_data}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <NftsView
              assets={assets}
            />
          </Grid>

        </Grid>
      </Container>
      <Footer />
    </>
  );
}

AddressView.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

AddressView.suppressHydrationWarning = true;

export default AddressView;