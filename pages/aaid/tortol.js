import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';
import { fetchTTdata } from 'src/api/fetch-calls'

import ProfileCover from 'src/content/aaid/tortol/profile-cover';
import Team from 'src/content/aaid/tortol/team';
import PriceStats from 'src/content/aaid/price-stats';
import TwitterFeed from 'src/content/aaid/tortol/twitter-feed';

const CryptoJS = require("crypto-js");

export async function getServerSideProps() {
  const token_id = '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.ccd6ccf11c5eab6a9964bc9a080a506342a4bb037209e100f0be238da7495a9c';

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
      ada_compare: calculate_tokens_to_ada(nativePrice).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }

    return {
      props: {
        froggie_data
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

export default function AAIDtortol({ froggie_data }) {
  const information = {
    description:
      "The Turtle Syndicate - an exciting new NFT project that brings the magic of the Turtle verse to life in the world of Cardano.",
    twitter: 'https://twitter.com/TortolToken',
    website: 'https://www.theturtlesyndicate.xyz/',
    buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=52162581184a457fad70470161179c5766f00237d4b67e0f1df1b4e6&tokenNameB=5452544c',
    price_data: froggie_data,
    ticker: '$TORTOL',
    twitter_handle: 'TortolToken'
  };

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
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

AAIDtortol.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

