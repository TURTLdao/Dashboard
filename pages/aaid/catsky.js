import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';
import { fetchTTdata } from 'src/api/fetch-calls'

import ProfileCover from 'src/content/aaid/catsky/profile-cover';
import Team from 'src/content/aaid/catsky/team';
import PriceStats from 'src/content/aaid/price-stats';
import TwitterFeed from 'src/content/aaid/catsky/twitter-feed';

export async function getServerSideProps() {
  const token_id = '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.d3c99ba691189e9be4e524ee1453d8aa4436d504432ec9be264f8a037f7b6840';

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
    const { circulatingSupply, dailyVolume, dilutedMarketCap, holders,
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

export default function AAIDfroggie({ froggie_data }) {
  const information = {
    description:
      "Believers in Cardano. Catsky Token is more than just a token; its a mission to make a substantial impact in the crypto world. With continuous development, Catsky offers unique NFT airdrops to its holders, fostering a community driven by creativity and innovation. Dive into the thrilling and engaging crypto journey that Catsky Token provides.",
    twitter: 'https://twitter.com/catskycrypto',
    website: 'https://catsky.io/',
    buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=9b426921a21f54600711da0be1a12b026703a9bd8eb9848d08c9d921&tokenNameB=434154534b59',
    price_data: froggie_data,
    ticker: '$CATSKY',
    twitter_handle: 'catskycrypto'
  };

  return (
    <>
      <Head>
        <title>Catsky Token - TurtleDAO Platform</title>
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

AAIDfroggie.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

