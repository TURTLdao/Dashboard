import Head from 'next/head';
import { useEffect } from 'react';
import { Box, Card, CardContent, Container, Divider, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { BuyVerified } from 'src/sections/launchpad/buy/buy-verified';

import { AdaCompareCard } from 'src/sections/launchpad/market-cards/compare';
import { PriceCard } from 'src/sections/launchpad/market-cards/price';
import { TokenEvents } from 'src/sections/launchpad/events';
import { Pie } from 'src/sections/launchpad/charts/distribution';
import { Bio } from 'src/sections/launchpad/profile/bio';
import { Profile } from 'src/sections/launchpad/profile/profile';

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
              <Profile sx={{ height: '100%', marginRight: '10px' }} token_profile_information={token_profile_information}/>
            </Grid>

            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <Bio sx={{ minWidth: "100%" }} token_bio_information={token_bio_information} />
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
                background: 'radial-gradient(circle, rgba(42,97,44,1) 0%, rgba(45,45,45,1) 100%)',
                border: "2px solid #4CAF50"
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
              <Card sx={{
                background: 'radial-gradient(circle, rgba(42,97,44,1) 0%, rgba(45,45,45,1) 100%)',
                border: "2px solid #4CAF50"
              }}>
                <CardContent>
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="racoonscoin"
                    theme='dark'
                    options={{
                      height: 500,
                    }}
                  />
                </CardContent>
              </Card>

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
