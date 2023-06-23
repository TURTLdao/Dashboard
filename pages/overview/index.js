import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState } from 'react';
import PageHeader from 'src/content/Dashboards/page-header';

import Footer from 'src/components/Footer';
import {
  Grid,
  Tab,
  Tabs,
  Divider,
  Container,
  Card,
  Box,
  useTheme,
  styled
} from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import TeamOverview from 'src/content/Dashboards/Tasks/TeamOverview';
import AboutSection from 'src/content/Dashboards/about/about';
import Watchlist from 'src/content/Dashboards/dao-watchlist';
import TradingViewWidget from '../components/tv-ada-chart'

import { fetchTTdata, fetchCardanoPrice } from 'src/api/fetch-calls'
import Cards from 'src/content/Dashboards/about/news'

export async function getServerSideProps() {
  const ttIDs = [
    '', // res for $TURTL
    '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.1075ae9bcffa581ce9bc3a67d1cfdb1471ca8b62dd56ba0d065275682a7e8258', // $FROGGIE
    '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.d3c99ba691189e9be4e524ee1453d8aa4436d504432ec9be264f8a037f7b6840', // $KONDA
    '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.76ab3fb1e92b7a58ee94b712d1c1bff0e24146e8e508aa0008443e1db1f2244e', // $CATSKY
    '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.778854dfbdabfd15860e20ade792f635cca51d27a45eae9083582889fc256938', // $RCCN
  ];

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
    const results = await Promise.all([
      fetchTTdata(ttIDs[1]),
      fetchTTdata(ttIDs[2]),
      fetchTTdata(ttIDs[3]),
      fetchTTdata(ttIDs[4]),
      fetchCardanoPrice(),
    ]);

    const { nativePrice: froggie_price, dailyVolume: froggie_volume,
      holders: froggie_holders, numTransactions: froggie_transactions,
      pricePercentChange: froggie_daily_percent, weekPercentChange: froggie_weekly_percent,
      monthPercentChange: froggie_monthly_percent, dilutedMarketCap: froggie_fdm } = results[0];
    const { nativePrice: konda_price, dailyVolume: konda_volume,
      holders: konda_holders, numTransactions: konda_transactions,
      pricePercentChange: konda_daily_percent, weekPercentChange: konda_weekly_percent,
      monthPercentChange: konda_monthly_percent, dilutedMarketCap: konda_fdm } = results[1];
    const { nativePrice: catsky_price, dailyVolume: catsky_volume,
      holders: catsky_holders, numTransactions: catsky_transactions,
      pricePercentChange: catsky_daily_percent, weekPercentChange: catsky_weekly_percent,
      monthPercentChange: catsky_monthly_percent, dilutedMarketCap: catsky_fdm } = results[2];
    const { nativePrice: rccn_price, dailyVolume: rccn_volume,
      holders: rccn_holders, numTransactions: rccn_transactions,
      pricePercentChange: rccn_daily_percent, weekPercentChange: rccn_weekly_percent,
      monthPercentChange: rccn_monthly_percent, dilutedMarketCap: rccn_fdm } = results[3];

    const froggie_data = {
      price: Number(froggie_price).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 }),
      daily_volume: Number(froggie_volume).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      holders: Number(froggie_holders).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      transactions: Number(froggie_transactions).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      fdm: Number(froggie_fdm).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      percent_change: {
        daily: froggie_daily_percent,
        weekly: froggie_weekly_percent,
        monthly: froggie_monthly_percent,
      },
      ada_compare: calculate_tokens_to_ada(froggie_price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }

    const konda_data = {
      price: Number(konda_price).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 }),
      daily_volume: Number(konda_volume).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      holders: Number(konda_holders).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      transactions: Number(konda_transactions).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      fdm: Number(konda_fdm).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      percent_change: {
        daily: konda_daily_percent,
        weekly: konda_weekly_percent,
        monthly: konda_monthly_percent,
      },
      ada_compare: calculate_tokens_to_ada(konda_price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }

    const catsky_data = {
      price: Number(catsky_price).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 }),
      daily_volume: Number(catsky_volume).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      holders: Number(catsky_holders).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      transactions: Number(catsky_transactions).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      fdm: Number(catsky_fdm).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      percent_change: {
        daily: catsky_daily_percent,
        weekly: catsky_weekly_percent,
        monthly: catsky_monthly_percent,
      },
      ada_compare: calculate_tokens_to_ada(catsky_price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }

    const rccn_data = {
      price: Number(rccn_price).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 }),
      daily_volume: Number(rccn_volume).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      holders: Number(rccn_holders).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      transactions: Number(rccn_transactions).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      fdm: Number(rccn_fdm).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      percent_change: {
        daily: rccn_daily_percent,
        weekly: rccn_weekly_percent,
        monthly: rccn_monthly_percent,
      },
      ada_compare: calculate_tokens_to_ada(rccn_price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }

    const { ada_usd: usd, ada_eur: eur, ada_jpy: jpy, ada_gbp: gbp, ada_cad: cad, ada_aud: aud, ada_brl: brl } = results[4];
    const ada_fiat = { usd, eur, jpy, gbp, cad, aud, brl }

    const full_data = { froggie_data, konda_data, catsky_data, rccn_data, ada_fiat}

    return {
      props: {
        full_data
      },
    };
  } catch (error) {
    console.error('Error:', error);
    const froggie_data = {};
    const konda_data = {};
    const catsky_data = {};
    const rccn_data = {};
    const full_data = { froggie_data, konda_data, catsky_data, rccn_data}
    return {
      props: {
        full_data
      },
    };
  }
}

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(2)};
      position: relative;
      bottom: -1px;

      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
      }

      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;
          bottom: -4px;
          background: none;
          border: 0;

          &:after {
            position: absolute;
            left: 50%;
            width: 28px;
            content: ' ';
            margin-left: -14px;
            background: ${theme.colors.primary.main};
            border-radius: inherit;
            height: 100%;
          }
      }

      .MuiTab-root {
          &.MuiButtonBase-root {
              height: 44px;
              min-height: 44px;
              background: ${theme.colors.alpha.white[50]};
              border: 1px solid ${theme.colors.alpha.black[10]};
              border-bottom: 0;
              position: relative;
              margin-right: ${theme.spacing(1)};
              font-size: ${theme.typography.pxToRem(14)};
              color: ${theme.colors.alpha.black[80]};
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              .MuiTouchRipple-root {
                opacity: .1;
              }

              &:after {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                bottom: 0;
                height: 1px;
                content: '';
                background: ${theme.colors.alpha.black[10]};
              }

              &:hover {
                color: ${theme.colors.alpha.black[100]};
              }
          }

          &.Mui-selected {
              color: ${theme.colors.alpha.black[100]};
              background: ${theme.colors.alpha.white[100]};
              border-bottom-color: ${theme.colors.alpha.white[100]};

              &:after {
                height: 0;
              }
          }
      }
  `
);

export default function Overview({ full_data }) {
  const theme = useTheme();

  const [currentTab, setCurrentTab] = useState('analytics');

  const tabs = [
    { value: 'analytics',  label: 'Overview' },
    { value: 'taskSearch', label: 'About TurtleDAO' },
    { value: 'news',       label: 'TurtleDAO News' }
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>Overview - TurtleDAO Platform</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <TabsContainerWrapper>
          <Tabs
            onChange={handleTabsChange}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </TabsContainerWrapper>
        <Card variant="outlined">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={0}
          >
            {currentTab === 'analytics' && (
              <>
                <Grid item xs={12}>
                  <TradingViewWidget/>
                  <Divider />
                  <Box p={4}>
                    <Watchlist data={full_data}/>
                  </Box>
                  <Divider />
                </Grid>
              </>
            )}

            {currentTab === 'taskSearch' && (
              <Grid item xs={12}>
                <Box p={4}>
                  <AboutSection />
                </Box>
              </Grid>
            )}

            {currentTab === 'news' && (
              <Grid item xs={12}>
                <Box p={4}>
                  <Cards />
                </Box>
              </Grid>
            )}
          </Grid>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

Overview.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

