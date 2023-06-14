import Head from 'next/head';
import { useEffect } from 'react';
import { Box, Card, CardContent, Container, Divider, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { TokenEvents } from 'src/sections/launchpad/events';

import { PriceCard } from 'src/components/market-cards/price';
import { AdaCompareCard } from 'src/components/market-cards/compare';
import { BuyVerified } from 'src/components/howto/buy';
import { About } from 'src/components/token-profile/about';
import { TokenInfo } from 'src/components/token-profile/token-info';
import { Pie } from 'src/components/charts/distro-pie';

import { fetchTTdata } from 'src/api/fetch-calls';

import KondaInformation from 'src/tokens/konda';
import { TwitterFeed } from 'src/components/twitter-feed';

export async function getServerSideProps() {
  const token_id = '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.d3c99ba691189e9be4e524ee1453d8aa4436d504432ec9be264f8a037f7b6840';

  try {
    const { circulatingSupply, dailyVolume, dilutedMarketCap, holders,
      monthPercentChange, weekPercentChange, pricePercentChange, nativePrice,
      numTransactions } = await fetchTTdata(token_id);

    return {
      props: {
        konda_price: nativePrice,
        konda_24h_volume: dailyVolume
      },
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      props: {
        konda_price: 0,
        konda_24h_volume: 0
      },
    };
  }
}

export default function Page({ konda_price, konda_24h_volume }) {
  const {
    future_events,
    current_events,
    past_events,
    coin_name,
    ticker,
    token_logo,
    formatted_marketcap,
    formatted_price,
    formatted_volume,
    marketcap_title,
    price_title,
    volume_title,
    verfied_buy_information,
    token_bio_information,
    token_profile_information
  } = KondaInformation(konda_price, konda_24h_volume);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  return (
  <>
    <Head>
      <title>
        $KONDA | TurtleDAO
      </title>
    </Head>

    <ThemeProvider theme={theme}>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        bgcolor: "#1d1d1d"
      }}
    >
      <Container maxWidth="xl" >
        <Grid
          container
          spacing={3}
        >
          <Grid xs={12} sm={6} lg={3} >
            <PriceCard sx={{ height: '100%', marginRight: '10px' }} lastPrice={formatted_price} imageLink={token_logo} cardTitle={price_title}/>
          </Grid>

          <Grid xs={12} sm={6} lg={3} >
            <PriceCard sx={{ height: '100%', marginRight: '10px' }} lastPrice={formatted_marketcap} cardTitle={marketcap_title}/>
          </Grid>

          <Grid xs={12} sm={6} lg={3} >
            <PriceCard sx={{ height: '100%', marginRight: '10px' }} lastPrice={formatted_volume} cardTitle={volume_title}/>
          </Grid>

          <Grid xs={12} sm={6} lg={3} >
            <AdaCompareCard sx={{ height: '100%', marginRight: '10px' }} tokenPrice={formatted_price} ticker={ticker} />
          </Grid>
          
        </Grid>


        <div>
          <Grid
            container
            spacing={3}
            sx={{
              mt: 2
            }}
          >
            <Grid 
              xs={12}
              md={6}
              lg={4}
            >
              <TokenInfo sx={{ height: '100%', marginRight: '10px' }} token_profile_information={token_profile_information}/>
            </Grid>

            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <About sx={{ minWidth: "100%" }} token_bio_information={token_bio_information} />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <BuyVerified sx={{ minWidth: "100%" }} verfied_buy_information={verfied_buy_information} />
            </Grid>
          </Grid>
        </div>
        
        <div>
          <Grid
            container
            spacing={3}
            sx={{
              mt: 2
            }}
          >
            <Grid
              xs={12}
              md={6}
              lg={4}
              
            >
              <TwitterFeed twitter_handle={'AdaKondaCoin'}/>

            </Grid>

          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <Pie
              chartSeries={[55, 15, 17, 7.5, 3, 2.5]}
              labels={['LP', 'Utility', 'Airdrops', 'Pre-Sale', 'Reserved', 'Burned']}
              sx={{ height: '100%', marginRight: '10px' }}
            />
          </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <TokenEvents
                sx={{ minWidth: "100%" }}
                future_events={future_events}
                current_events={current_events}
                past_events={past_events}
                ticker={ticker}
                coinName={coin_name}
              />
            </Grid>

          </Grid>
        </div>
        
        

        <div>
          <Grid
            container
            spacing={3}
            sx={{
              mt: 2
            }}
          >
            <Grid 
              xs={12}
              md={6}
              lg={4}
            >
            </Grid>

          </Grid>
        </div>
      </Container>
    </Box></ThemeProvider>
  </>
);
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
