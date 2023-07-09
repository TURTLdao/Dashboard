import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState } from 'react';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import Footer from 'src/components/Footer';

import TrendingTokensTable from 'src/page-content/cardano/trending-tokens'
import { trendingTokensData } from 'src/api/market-data'


export async function getServerSideProps() {
    try {
      const results = await Promise.all([
        trendingTokensData(),
      ]);
    
      const trending_market_data = results[0];

      return {
        props: {
          trending_market_data
        },
      };
    } catch (error) {
      console.error('Error:', error);
      const trending_market_data = {};
  
      return {
        props: {
          trending_market_data
        },
      };
    }
  }

function TrendingTokensView({trending_market_data}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Head>
        <title>Trending Tokens - TurtleDAO Platform</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Cardano's Top 25 Trending Tokens"
          subHeading="Keep up to date with the latest trending tokens on the Cardano blockchain."
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TrendingTokensTable cryptoOrders={trending_market_data}/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

TrendingTokensView.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default TrendingTokensView;