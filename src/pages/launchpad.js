import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useState, useEffect } from 'react';
import LaunchpadSearch from 'src/sections/launchpad/launchpad-search';
import { LaunchpadView } from 'src/sections/launchpad/launchpad-view';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getLastPrice, fetchTTdata } from 'src/api/fetch-calls';
import { daoItems } from 'src/tokens/dao-supported';

export async function getServerSideProps() {
  const ttIDs = [
    '', // res for $TURTL
    '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.1075ae9bcffa581ce9bc3a67d1cfdb1471ca8b62dd56ba0d065275682a7e8258', // $FROGGIE
    '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.d3c99ba691189e9be4e524ee1453d8aa4436d504432ec9be264f8a037f7b6840', // $KONDA
    '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.76ab3fb1e92b7a58ee94b712d1c1bff0e24146e8e508aa0008443e1db1f2244e', // $CATSKY
    '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.778854dfbdabfd15860e20ade792f635cca51d27a45eae9083582889fc256938', // $RCCN
  ];

  try {
    const { nativePrice: froggie_price } = await fetchTTdata(ttIDs[1]);
    const { nativePrice: konda_price } = await fetchTTdata(ttIDs[2]);
    const { nativePrice: catsky_price } = await fetchTTdata(ttIDs[3]);
    const { nativePrice: rccn_price } = await fetchTTdata(ttIDs[4]);
    
    const formatted_prices = {
      turtle: Number(0).toFixed(10),
      froggie: Number(froggie_price).toFixed(10),
      konda: Number(konda_price).toFixed(10),
      catsky: Number(catsky_price).toFixed(10),
      rccn: Number(rccn_price).toFixed(10),
    }

    return {
      props: {
        formatted_prices
      },
    };

  } catch (error) {
    console.error('Error:', error);
    const formatted_prices = {};
    return {
      props: {
        formatted_prices
      },
    };
  }
}


export default function Page({ formatted_prices }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  const dao_items = daoItems(formatted_prices);
  const [filteredCompanies, setFilteredCompanies] = useState(dao_items);

  return (
  <>
    <Head>
      <title>
        AAID | TurtleDAO Platform
      </title>
    </Head>
    <ThemeProvider theme={theme}>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        background: '#1d1d1d',
            
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4" color={'white'}>
                Auditing and Audience Development Initiative
              </Typography>
            </Stack>
          </Stack>

          <LaunchpadSearch companies={dao_items} setFilteredCompanies={setFilteredCompanies}/>

          <Grid container spacing={3}>
            {filteredCompanies.map((dao_items) => (
              <Grid xs={12} md={6} lg={4} key={dao_items.id}>
                <LaunchpadView company={dao_items} />
              </Grid>
            ))}
          </Grid>

        </Stack>
      </Container>
    </Box>
    </ThemeProvider>
  </>
);
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
