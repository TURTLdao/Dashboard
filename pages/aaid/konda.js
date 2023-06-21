import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';
import { fetchTTdata } from 'src/api/fetch-calls'

import ProfileCover from 'src/content/aaid/konda/profile-cover';
import Team from 'src/content/aaid/konda/team';
import PriceStats from 'src/content/aaid/price-stats';
import TwitterFeed from 'src/content/aaid/konda/twitter-feed';

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
    
    const konda_data = {
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
        konda_data
      },
    };
  } catch (error) {
    console.error('Error:', error);
    const konda_data = {};
    return {
      props: {
        konda_data
      },
    };
  }
}

export default function AAIDkonda({ konda_data }) {
  const information = {
    description:
      "The sh*t coin that cares! Our mission is both simple and effective: we find an NFT or a token, munch on it and spit it back out to the community. This concept is called ”FEED the KONDA”.",
    twitter: 'https://twitter.com/AdaKondaCoin',
    website: 'http://adakondacoin.com/',
    buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=501dd5d2fbab6af0a26b1421076ff3afc4d5a34d6b3f9694571116ea&tokenNameB=4b4f4e4441',
    price_data: konda_data,
    ticker: '$KONDA',
    twitter_handle: 'AdaKondaCoin'
  };

  return (
    <>
      <Head>
        <title>AdaKonda Coin - TurtleDAO Platform</title>
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
            <TwitterFeed />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

AAIDkonda.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

