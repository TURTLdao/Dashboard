import Head from 'next/head';
import { useState } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';
import Footer from 'src/components/Footer';

import ProfileCover from 'src/page-content/aaid/profile-cover'
import PriceStats from 'src/page-content/aaid/price-stats';
import Team from 'src/page-content/aaid/team';
import TopHolders from 'src/page-content/aaid/top-holders';
import RecentTransactions from 'src/page-content/aaid/recent-txs';

import { adastatTokenData } from 'src/api/address-data'
import { taptoolsMarketData, cardanoPrice } from 'src/api/market-data'

import { tokensToAda } from 'src/utils/balance'

import { Grid, Container } from '@mui/material';

const { DAO_SUPPORTED_ITEMS } = require('src/dao/dao-object.js');

export async function getServerSideProps() {
  const policy = DAO_SUPPORTED_ITEMS.tortol.policy_full;
  const taptools_id = DAO_SUPPORTED_ITEMS.tortol.taptools_id;

  try {
    const market_data = await taptoolsMarketData(taptools_id);
    const adastat = await adastatTokenData(policy);
    const cardano_fiat_data = await cardanoPrice();

    const token_data = {
      price: Number(market_data.nativePrice).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 }),
      daily_volume: Number(market_data.dailyVolume).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      holders: Number(market_data.holders).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      transactions: Number(market_data.numTransactions).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      fdm: Number(market_data.dilutedMarketCap).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      percent_change: {
        daily: market_data.pricePercentChange,
        weekly: market_data.weekPercentChange,
        monthly: market_data.monthPercentChange,
      },
      ada_compare: tokensToAda(market_data.nativePrice).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      holders_rows: adastat.holders_row,
      recent_txs: adastat.transactions_row
    }
    //console.log(token_data)
  
    return {
      props: {
        token_data, cardano_fiat_data
    },
    };
  } catch (error) {
    console.error('Error:', error);
    const token_data = {};
    const cardano_fiat_data = {};
    return {
      props: {
        token_data, cardano_fiat_data
      },
    };
  }
}

export default function Tortol({ token_data, cardano_fiat_data }) {
  const info = DAO_SUPPORTED_ITEMS.tortol;

  return (
    <>
      <Head>
        <title>Tortol - TurtleDAO Platform</title>
      </Head>

      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover
              info={info}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <PriceStats
              info={info}
              token_data={token_data}
              cardano_fiat_data={cardano_fiat_data}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Team
              info={info}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <TopHolders
              info={info}
              holders_rows={token_data.holders_rows}
              cardano_fiat_data={cardano_fiat_data}
              supply={info.supply}
              token_price={token_data.price}
            />
          </Grid>
          {/*
          <Grid item xs={12} md={12}>
            <RecentTransactions
              info={info}
              transactions_rows={token_data.recent_txs}
              cardano_fiat_data={cardano_fiat_data}
              supply={info.supply}
              token_price={token_data.price}
            />
          </Grid>
          */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Tortol.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

