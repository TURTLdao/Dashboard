import Head from 'next/head';
import { useEffect } from 'react';
import { Box, Card, CardContent, Container, Divider, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { TwitterFeed } from 'src/components/twitter-feed';
import { BuyVerified } from 'src/components/howto/buy';
import { PriceCard } from 'src/components/market-cards/price';
import { AdaCompareCard } from 'src/components/market-cards/compare';
import { Pie } from 'src/components/charts/distro-pie';
import { About } from 'src/components/token-profile/about';
import { TokenInfo } from 'src/components/token-profile/token-info';
import { TokenEvents } from 'src/sections/launchpad/events';

import { fetchTTdata } from 'src/api/fetch-calls';

import RccnInformation from 'src/tokens/rccn';

export async function getServerSideProps() {
  const token_id = '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.778854dfbdabfd15860e20ade792f635cca51d27a45eae9083582889fc256938';

  try {
    const { circulatingSupply, dailyVolume, dilutedMarketCap, holders,
      monthPercentChange, weekPercentChange, pricePercentChange, nativePrice,
      numTransactions } = await fetchTTdata(token_id);

    return {
      props: {
        rccn_price: nativePrice,
        rccn_24h_volume: dailyVolume
      },
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      props: {
        rccn_price: 0,
        rccn_24h_volume: 0
      },
    };
  }
}

export default function Page({ rccn_price, rccn_24h_volume }) {
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
  } = RccnInformation(rccn_price, rccn_24h_volume);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });
  const bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg';


  return (
  <>
    <Head>
      <title>
        $RCCN | TurtleDAO
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
          <Grid
            container
            spacing={3}
            sx={{
              mt: 2
            }}
          >
            <Grid
              xs={12}
              md={12}
              lg={12}
              
            >
              <Card sx={{
                border: "2px solid #4CAF50",
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}>
                <CardContent>
                    <iframe style={{ width: "100%", height: "500px"}} src='https://racoonsclub.io/game'/>
                </CardContent>
              </Card>

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
              md={8}
              lg={8}
            >
              <TwitterFeed twitter_handle={'racoonscoin'}/>
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
