import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useState, useEffect } from 'react';

import Slider from "react-slick";
import { fetchTTdata } from 'src/api/fetch-calls';

import { VersionBanner } from 'src/components/banners/version';
import { DaoTokensCarousel } from 'src/components/carousels/dao-tokens';
import { FrontpageWatchlist } from 'src/components/tables/frontpage-watchlist';

export async function getServerSideProps() {
  const ttIDs = [
    '', // res for $TURTL
    '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.1075ae9bcffa581ce9bc3a67d1cfdb1471ca8b62dd56ba0d065275682a7e8258', // $FROGGIE
    '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.d3c99ba691189e9be4e524ee1453d8aa4436d504432ec9be264f8a037f7b6840', // $KONDA
    '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.76ab3fb1e92b7a58ee94b712d1c1bff0e24146e8e508aa0008443e1db1f2244e', // $CATSKY
    '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.778854dfbdabfd15860e20ade792f635cca51d27a45eae9083582889fc256938', // $RCCN
  ];

  try {
    const { nativePrice: froggie_price, dailyVolume: froggie_volume } = await fetchTTdata(ttIDs[1]);
    const { nativePrice: konda_price, dailyVolume: konda_volume } = await fetchTTdata(ttIDs[2]);
    const { nativePrice: catsky_price, dailyVolume: catsky_volume } = await fetchTTdata(ttIDs[3]);
    const { nativePrice: rccn_price, dailyVolume: rccn_volume } = await fetchTTdata(ttIDs[4]);
    
    const prices = {
      turtle: Number(0).toFixed(10),
      froggie: Number(froggie_price).toFixed(10),
      konda: Number(konda_price).toFixed(10),
      catsky: Number(catsky_price).toFixed(10),
      rccn: Number(rccn_price).toFixed(10),
    }

    const volumes = {
      turtle: Number(0).toFixed(10),
      froggie: Number(froggie_volume).toFixed(10),
      konda: Number(konda_volume).toFixed(10),
      catsky: Number(catsky_volume).toFixed(10),
      rccn: Number(rccn_volume).toFixed(10),
    }

    const market_data = { prices, volumes }

    return {
      props: {
        market_data
      },
    };

  } catch (error) {
    console.error('Error:', error);
    const market_data = [];
    return {
      props: {
        market_data
      },
    };
  }
}


export default function Page({ market_data }) {
  const calculate_tokens_to_ada = (tokenPrice) => {
    if (tokenPrice <= 0) {
      return 0; // Invalid tokenPrice
    }

    const out = 1 / tokenPrice;
    if (out < 1) {
      return out.toFixed(5);
    } else {
      return (1 / tokenPrice);
    }
  };

  const calculateMarketValues = (price, rawSupply, volume) => {
    return {
      price: parseFloat(price),
      marketcap: price * rawSupply,
      to_ada: calculate_tokens_to_ada(price),
      volume: parseFloat(volume)
    };
  };

  const turtle_market = calculateMarketValues(0, 300000000, 0);
  const froggie_market = calculateMarketValues(market_data.prices.froggie, 69000000000, market_data.volumes.froggie);
  const konda_market = calculateMarketValues(market_data.prices.konda, 84322711100, market_data.volumes.konda);
  const catsky_market = calculateMarketValues(market_data.prices.catsky, 1000000000000, market_data.volumes.catsky);
  const rccn_market = calculateMarketValues(market_data.prices.rccn, 1000000000000, market_data.volumes.rccn);

  const full_market_data =
  {
    turtle_market, froggie_market, konda_market, catsky_market, rccn_market
  }

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
            <DaoTokensCarousel
              sx={{ height: '100%' }} formatted_prices={market_data.prices}
            />
          </Grid>

          <Grid
            xs={12}
            sm={4}
            lg={8}
          >
            <FrontpageWatchlist market_data={full_market_data}/>
            
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

