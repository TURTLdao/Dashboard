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

import PolicyCover from 'src/page-content/policy/cover'
import PolicyStats from 'src/page-content/policy/stats'

import TopHolders from 'src/page-content/aaid/top-holders';
import RecentTransactions from 'src/page-content/aaid/recent-txs';

import { adastatTokenData, adastatPolicyData } from 'src/api/address-data'
import { taptoolsMarketData, taptoolsNftMarketData, cardanoPrice } from 'src/api/market-data'
import { tokensToAda } from 'src/utils/balance'

const { KnownPolicies } = require('src/consts/known-policy.js');

export async function getServerSideProps(context) {
  const { policy } = context.query;
  const known_policies = KnownPolicies;

  try {
    const cardano_fiat_data = await cardanoPrice();
    const is_a_match = Object.values(known_policies).some((obj) => obj.policy === policy);
    const is_dao = Object.values(known_policies).some((obj) => obj.checktype === 'dao');

    let tokenPolicy = '';
    let nftPolicy = '';
    let details = {};
    let price = 0;
    let daily_volume = 0;
    let market_cap = 0;
    let one_ada_gets = 0;
    let price_change = { twofour: 0, seven: 0, thirty: 0 };
    let market_details = { price: 0, daily_volume: 0, market_cap: 0 };

    if (is_a_match) {
      const matchedToken = Object.values(known_policies).find((obj) => obj.policy === policy && obj.type === 'Token');
      const matchedNft = Object.values(known_policies).find((obj) => obj.policy === policy && obj.type === 'NFT');

      if (matchedToken) {
        tokenPolicy = matchedToken.links.tt_id;
        details = await taptoolsMarketData(tokenPolicy);
        price = details.nativePrice;
        daily_volume = details.dailyVolume;
        market_cap = details.dilutedMarketCap;
        one_ada_gets = tokensToAda(details.nativePrice).toLocaleString(undefined, { minimumFractionDigits: 5, maximumFractionDigits: 5 });
        price_change.twofour = Number(details.pricePercentChange).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%' || 0;
        price_change.seven = Number(details.weekPercentChange).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%' || 0;
        price_change.thirty = Number(details.monthPercentChange).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%' || 0;
      } else if (matchedNft) {
        nftPolicy = matchedNft.policy;
        details = await taptoolsNftMarketData(nftPolicy);
        price = details.floorPrice;
        daily_volume = details.dailyVolume;
        market_cap = details.marketCap;
        price_change.twofour = Number(details.twentyfour_hour_change_percent).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%' || 0;
        price_change.seven = Number(details.thirty_day_change_percent).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%' || 0;
        price_change.thirty = Number(details.seven_day_change_percent).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%' || 0;
      }
    }

    if (price > 0 && market_cap > 0) {
      market_details = {
        price: Number(price).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 }),
        daily_volume: Number(daily_volume).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        market_cap: Number(market_cap).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        ...(one_ada_gets ? { one_ada_gets } : null),
        price_change: price_change,
      };
    }

    const adastat_token = await adastatTokenData(policy);

    const time_tx_tmp = {
      last_tx: adastat_token.time_tx.last_tx,
      last_hash: adastat_token.time_tx.last_hash,
      first_tx: adastat_token.time_tx.first_tx,
      first_hash: adastat_token.time_tx.first_hash
    };

    let tx_rows = adastat_token.transactions_row
    let holders_rows = adastat_token.holders_row
    const time_tx = time_tx_tmp;
    const holders = adastat_token.holders
    const tx_count = adastat_token.tx_count
    const supply = adastat_token.supply
    const image = adastat_token.image
    const name = adastat_token.name

    const asset_data = {
      tx_rows: tx_rows,
      holders_rows: holders_rows,
      time_tx: time_tx,
      holders: holders,
      tx_count: tx_count,
      supply: supply,
      is_current_a_match: is_a_match,
      is_dao: is_dao,
      market_details: market_details,
      name: name,
      image: image,
    };

    //const adastat_policy = await adastatPolicyData(policy);

    //if (!asset_data.holders_rows || !asset_data.tx_rows) {
    //  return {
    //    redirect: {
    //      destination: '/404', // Redirect to the 404 page
    //      permanent: false, // Set it as a temporary redirect
    //    },
    //  };
    //}
  

    const policy_data = { asset_data };

    return {
      props: {
        policy_data,
        policy,
        cardano_fiat_data,
        is_a_match,
        asset_data,
        tx_rows,
        holders_rows
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        error: "An error occurred",
      },
    };
  }
}

function PolicyView({
  policy_data, policy, cardano_fiat_data, is_a_match, asset_data, tx_rows, holders_rows
}) {
  const known_policies = KnownPolicies;

  return (
    <>
      <Head>
        <title>Policy - TurtleDAO Platform</title>
      </Head>

      <Container maxWidth="lg">
      { is_a_match ? 
        <>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          sx={{ mt: 2 }}
        >
          <Grid item xs={12} md={8}>
            <PolicyCover
              policy={policy}
              known_policies={known_policies}
              policy_data={policy_data}
            />
          </Grid>
{/*
          <Grid item xs={12} md={4}>
            <PolicyStats
              policy_data={policy_data}
              cardano_fiat_data={cardano_fiat_data}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TopHolders 
              holders_rows={holders_rows}
              supply={asset_data.supply}
              token_price={asset_data.market_details.price}
              cardano_fiat_data={cardano_fiat_data}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <RecentTransactions
              transactions_rows={tx_rows}
              supply={asset_data.supply}
              token_price={asset_data.market_details.price}
              cardano_fiat_data={cardano_fiat_data}
              decimals={policy_data.asset_data.decimals}
            />
          </Grid>
      */}

        </Grid>
        </>
        :
        <>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          sx={{ mt: 2 }}
        >
          <Grid item xs={12} md={12}>
            <PolicyCover
              policy={policy}
              known_policies={known_policies}
              policy_data={policy_data}
            />
          </Grid>
{/*
          <Grid item xs={12} md={6}>
            <TopHolders
              holders_rows={holders_rows}
              supply={policy_data.asset_data.supply}
              token_price={policy_data.asset_data.market_details.price}
              cardano_fiat_data={cardano_fiat_data}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <RecentTransactions
              transactions_rows={tx_rows}
              supply={policy_data.asset_data.supply}
              cardano_fiat_data={cardano_fiat_data}
              decimals={policy_data.asset_data.decimals}
            />
          </Grid>
      */}


        </Grid>
        </>
      }
      </Container>
      <Footer />
    </>
  );
}

PolicyView.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

PolicyView.suppressHydrationWarning = true;

export default PolicyView;