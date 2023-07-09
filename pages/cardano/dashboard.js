import Head from 'next/head';
import { useState } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';
import PageTitle from 'src/components/PageTitle';
import Footer from 'src/components/Footer';

import {
  Grid, Tab, Tabs, Container, Card, Box, styled, Typography, Divider
} from '@mui/material';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import DashboardView from 'src/page-content/cardano/dashboard'
import SearchTokenView from 'src/page-content/cardano/search-token'

import { poolpmAddressData } from 'src/api/address-data'

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

function CardanoDashboardView({ poolpm_wallets }) {

  const [currentTab, setCurrentTab] = useState('address');

  const tabs = [
    { value: 'main',    label: 'Main View' },
    { value: 'token',   label: 'Search Token' },
    { value: 'nft',     label: 'Search NFT' },
    { value: 'block',   label: 'Search Block' },
    { value: 'tx',      label: 'Search Transaction' }
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>Search - TurtleDAO Platform</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Everything Cardano"
          subHeading="All in one pretty place."
        />
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Card variant="outlined">
          <Grid item xs={12}>
            <Box p={4}>
              <>
                <DashboardView/>
              </>
            </Box>
          </Grid>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

CardanoDashboardView.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CardanoDashboardView;