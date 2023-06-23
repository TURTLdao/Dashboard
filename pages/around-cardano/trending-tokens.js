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
import CardActions from '@mui/material/CardActions';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import TrendingTokensTable from 'src/content/around-cardano/tables/trending-tokens'
import { fetchTTtrendingData } from 'src/api/fetch-calls'


export async function getServerSideProps() {
    try {
      const results = await Promise.all([
        fetchTTtrendingData(),
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
  
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function AAIDindex({trending_market_data}) {
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
            <Card>
              <CardContent>
                <TrendingTokensTable cryptoOrders={trending_market_data}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

AAIDindex.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default AAIDindex;
