import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';
import { fetchTTdata, fetchAdaStatHolders, fetchCardanoPrice } from 'src/api/fetch-calls'

import ProfileCover from 'src/content/aaid/froggie/profile-cover';
import Team from 'src/content/aaid/froggie/team';
import PriceStats from 'src/content/aaid/price-stats';
import TwitterFeed from 'src/content/aaid/froggie/twitter-feed';
import HoldersTable from 'src/content/aaid/holders-table';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';


export async function getServerSideProps() {
  const token_id = '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.1075ae9bcffa581ce9bc3a67d1cfdb1471ca8b62dd56ba0d065275682a7e8258';

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

  try {
    const { dailyVolume, dilutedMarketCap, holders,
      monthPercentChange, weekPercentChange, pricePercentChange, nativePrice,
      numTransactions } = await fetchTTdata(token_id);
    const adastats_data = await fetchAdaStatHolders('79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a146524f47474945')
    const rows = adastats_data.rows;

    const { ada_usd: usd, ada_eur: eur, ada_gbp: gbp } = await fetchCardanoPrice();
    const fiat = [usd, gbp, eur]

    const froggie_data = {
      price: Number(nativePrice).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 }),
      daily_volume: Number(dailyVolume).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      holders: Number(holders).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      transactions: Number(numTransactions).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      fdm: Number(dilutedMarketCap).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      percent_change: {
        daily: pricePercentChange,
        weekly: weekPercentChange,
        monthly: monthPercentChange,
      },
      ada_compare: calculate_tokens_to_ada(nativePrice).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      holders_rows: rows,
    }

    return {
      props: {
        froggie_data, fiat
      },
    };
  } catch (error) {
    console.error('Error:', error);
    const froggie_data = {};
    return {
      props: {
        froggie_data
      },
    };
  }
}

export default function AAIDfroggie({ froggie_data, fiat }) {
  const [rows, setRows] = useState(froggie_data.holders_rows);

  const information = {
    description:
      "Froggie is here for everyone. Froggie is the new wave. Join us in the pond. Froggies are life, Froggies are love and we want Froggies to stay.",
    twitter: 'https://twitter.com/froggieo_',
    website: 'https://froggies.vercel.app/',
    buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a1&tokenNameB=46524f47474945',
    price_data: froggie_data,
    ticker: '$FROGGIE',
    twitter_handle: 'froggieo_'
  };
  const supply = 60000000000

  return (
    <>
      <Head>
        <title>Froggie Koin - TurtleDAO Platform</title>
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
            <ProfileCover user={information} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PriceStats data={information}/>
          </Grid>
          <Grid item xs={12} md={8}>
            <Team />
          </Grid>
          <Grid item xs={12} md={4}>
            <TwitterFeed  />
          </Grid>
          <Grid item xs={12} md={10}>
            <HoldersTable rows={rows} supply={supply} token_price={froggie_data.price} fiat={fiat}/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

AAIDfroggie.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

