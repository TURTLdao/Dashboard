import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';
import { fetchTTdata } from 'src/api/fetch-calls'

import ProfileCover from 'src/content/aaid/rccn/profile-cover';
import Team from 'src/content/aaid/rccn/team';
import PriceStats from 'src/content/aaid/price-stats';
import TwitterFeed from 'src/content/aaid/rccn/twitter-feed';

export async function getServerSideProps() {
  const token_id = '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.778854dfbdabfd15860e20ade792f635cca51d27a45eae9083582889fc256938';

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
      "The first 3D/VR Website in Cardano. Racoons Club are building an educational platform in multichain Cardano & Polygon",
    twitter: 'https://twitter.com/racoonscoin',
    website: 'https://racoonsclub.io/',
    buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=a3e9d397a62992efd2bb54c954b59044948f11f4e14b28add5ebd847&tokenNameB=5243434e',
    price_data: froggie_data,
    ticker: '$RCCN',
    twitter_handle: 'racoonscoin'
  };

  return (
    <>
      <Head>
        <title>Racoons Club - TurtleDAO Platform</title>
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

