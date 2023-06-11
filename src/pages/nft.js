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
import { NftView } from 'src/sections/nft/nft-view';
import { NftItems } from 'src/sections/nft/nft-items';


export default function Page({  }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  const dao_items = NftItems();
  const [filteredCompanies, setFilteredCompanies] = useState(dao_items);

  return (
  <>
    <Head>
      <title>
        NFT | TurtleDAO Platform
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
                Discover NFTs
              </Typography>
            </Stack>
          </Stack>

          <Grid container spacing={3}>
            {filteredCompanies.map((dao_items) => (
              <Grid xs={12} md={6} lg={4} key={dao_items.id}>
                <NftView nftItems={dao_items} />
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
