
import { Grid, Container, Card, Box, useTheme, styled, Tabs, Tab, Divider
} from '@mui/material';

import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState } from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';

import PageHeader from 'src/page-content/dashboard/page-header';
import TradingViewChart from 'src/page-content/dashboard/tv-chart'
import StarredProjects from 'src/page-content/dashboard/starred-projects'

import MainTab from 'src/page-content/dashboard/tabs/main'
import PoweredByTab from 'src/page-content/dashboard/tabs/powered-by'
import { taptoolsMarketData } from 'src/api/market-data'


const { DAO_SUPPORTED_ITEMS } = require('src/dao/dao-object.js');

export async function getServerSideProps() {
  const froggie_taptools_id = DAO_SUPPORTED_ITEMS.froggie_koin.taptools_id;
  const catsky_taptools_id = DAO_SUPPORTED_ITEMS.catsky_token.taptools_id;

  try {
    const froggie_market_data = await taptoolsMarketData(froggie_taptools_id);
    const catsky_market_data = await taptoolsMarketData(catsky_taptools_id);

    const froggie_price = Number(froggie_market_data.nativePrice).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 })
    const catsky_price = Number(catsky_market_data.nativePrice).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 })

    return {
      props: {
        froggie_price, catsky_price
    },
    };
  } catch (error) {
    console.error('Error:', error);
    const token_data = {};
    const cardano_fiat_data = {};
    return {
      props: {
        token_data, cardano_fiat_data
      },
    };
  }
}

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(2)};
      position: relative;
      overflow: hidden;

      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
        overflow-x: auto;
      }

      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;
          background: none;
          border: 0;
          z-index: 1; /* Set a higher z-index to bring the indicator to the front */

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
              z-index: 0; /* Set a lower z-index to push the tabs back */

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
                z-index: 0; /* Set a lower z-index to push the tabs back */
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



export default function Dashboard({ froggie_price, catsky_price }) {
  const [currentTab, setCurrentTab] = useState('main');

  const tabs = [
    { value: 'main', label: 'About TurtleDAO' },
    { value: 'poweredby', label: 'Powered By' },
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  const price_data = {};


  return (
    <>
      <Head>
        <title>Dashboard - TurtleDAO Platform</title>
      </Head>

      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid item xs={12}>
          <Box p={4}>
            <StarredProjects froggie_price={froggie_price} catsky_price={catsky_price}/>
          </Box>
        </Grid>

        <Divider sx={{ my: 2 }}/>

        <TradingViewChart/>

        <Divider sx={{ my: 2 }}/>
        
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
            {currentTab === 'main' && (
              <>
                <Grid item xs={12}>
                  <Box p={4}>
                    <MainTab />
                  </Box>
                </Grid>
              </>
            )}

            {currentTab === 'poweredby' && (
              <>
                <Grid item xs={12}>
                  <Box p={4}>
                    <PoweredByTab />
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Card>

      </Container>
      <Footer />
    </>
  );
}

Dashboard.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;