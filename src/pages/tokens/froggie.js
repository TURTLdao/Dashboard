import Head from 'next/head';
import { useEffect } from 'react';
import { Box, Card, CardContent, Container, Divider, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { useTheme, ThemeProvider } from '@mui/material/styles';

import { FroggieNFTs } from 'src/sections/launchpad/showcase/froggie-nfts';

import { AdaCompareCard } from 'src/sections/launchpad/market-cards/compare';
import { PriceCard } from 'src/sections/launchpad/market-cards/price';
import { TokenEvents } from 'src/sections/launchpad/events';
import { Pie } from 'src/sections/launchpad/charts/distribution';
import { Bio } from 'src/sections/launchpad/profile/bio';
import { Profile } from 'src/sections/launchpad/profile/profile';
import { BuyVerified } from 'src/sections/launchpad/buy/buy-verified';

import { FroggiePriceChart } from 'src/sections/launchpad/charts/froggie-price';

import { fetchTTdata } from 'src/api/fetch-calls';

import FroggieInformation from 'src/tokens/froggie';

export async function getServerSideProps() {
  const token_id = '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.1075ae9bcffa581ce9bc3a67d1cfdb1471ca8b62dd56ba0d065275682a7e8258';

  try {
    const { circulatingSupply, dailyVolume, dilutedMarketCap, holders,
      monthPercentChange, weekPercentChange, pricePercentChange, nativePrice,
      numTransactions } = await fetchTTdata(token_id);

    return {
      props: {
        froggie_price: nativePrice,
        froggie_24h_volume: dailyVolume
      },
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      props: {
        froggie_price: 0,
        froggie_24h_volume: 0
      },
    };
  }
}

export default function Page({ froggie_price, froggie_24h_volume }) {
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
  } = FroggieInformation(froggie_price, froggie_24h_volume);

  // https://analyticsv2.muesliswap.com/price?policy-id=79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a1&tokenname=FROGGIE&interval=hourly

  const theme = useTheme();

  return (
  <>
    <Head>
      <title>
        $FROGGIE | TurtleDAO
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
              lg={8}
            >
              <Pie
                chartSeries={[38.18, 10.89, 20.72, 10.89, 19.32]}
                labels={['LP', 'Airdrops', 'OTC', 'Distribution', 'Development']}
                sx={{ height: '100%', marginRight: '10px' }}
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
            <ThemeProvider theme={theme}>
            <Card sx={{
              background: 'radial-gradient(circle, rgba(42,97,44,1) 0%, rgba(45,45,45,1) 100%)',
              border: "2px solid #4CAF50"
            }}>
              <CardContent>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="Froggieo_"
                theme='dark'
                options={{
                  height: 600,
                }}
              />
              </CardContent>
              </Card>
              </ThemeProvider>
              <Divider/>
              <Divider/>
              <Divider/>
              <Divider/>
              <FroggieNFTs sx={{ height: '100%', marginRight: '10px' }} />
            </Grid>

            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <Bio sx={{ minWidth: "100%" }} token_bio_information={token_bio_information} />
              <Divider/>
              <Divider/>
              <Divider/>
              <Divider/>
              
              <BuyVerified sx={{ minWidth: "100%" }} verfied_buy_information={verfied_buy_information} />
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
