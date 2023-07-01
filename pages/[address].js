import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import AddressCover from 'src/content/address/cover'
import AddressStats from 'src/content/address/stats'
import RecentTransactionsTable from 'src/content/address/recent-txs'

import {
  Container,
  Grid,
  Card,
  Button,
  CardContent,
  Divider, Typography 
} from '@mui/material';
import Footer from 'src/components/Footer';
import { fetchAddressDetails, fetchAdaStatTransactions } from 'src/api/fetch-calls'

export async function getServerSideProps(context) {
  const { address } = context.query;

  // Check if the address starts with 'addr'
  if (!address.startsWith('addr')) {
    return {
      redirect: {
        destination: '/404', // Redirect to the 404 page
        permanent: false, // Set it as a temporary redirect
      },
    };
  }

  // Fetch data based on the provided address
  const { balance, reward_balance, total_reward_amount, active_stake,
    tx, token, pool_bech32, pool_name, pool_ticker, first_reward_epoch,
    last_reward_epoch, first_tx_time, first_tx_hash, last_tx_time, last_tx_hash,
  } = await fetchAddressDetails(address);

  const data = {
    balance, reward_balance, total_reward_amount, active_stake, tx_count: tx,
    assets_count: token, pool_address: pool_bech32, pool_name, pool_ticker,
    first_reward_epoch, last_reward_epoch, first_tx_time, first_tx_hash,
    last_tx_time, last_tx_hash, address
  }

  const tx_rows = await fetchAdaStatTransactions(address);

  return {
    props: {
      data, tx_rows
    },
  };
}


function AddressSearchedView({ data, tx_rows }) {
  

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const known_addresses = {
    turtledao: 'addr1qywhrwe3vufpf66n7w9ld42ths6j6j53swv9agpt3pd0u409hz67cj83lhuhgvvtu97jd3fyswqu80g0s3uuawen7kmqv4w2sg',
    froggie: 'addr1q99eal8y8nw65yxhnn2vj2dyrq7rgh8juq5ld2freccd47shluyj4ps4xddymym86xlfe2sndcymk76gv88uccaq0rrqkyuump',
  }

  const custom_strings = {
    turtledao: 'This wallet belongs to the TurtleDAO Platform',
    froggie: 'This wallet belongs to the master Froggie',
  };

  const links = {
    turtledao: ['https://twitter.com/_turtledao', 'https://turtledao.vercel.app/'],
    froggie: ['https://twitter.com/froggio_', 'https://froggies.vercel.app/']
  }

  return (
    <>
      <Head>
        <title>Address - TurtleDAO Platform</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Address Explorer"
          subHeading="Freely provided by TurtleDAO."
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
          <Grid item xs={12} md={8}>
            <AddressCover
              data={data}
              known_addresses={known_addresses}
              custom_strings={custom_strings}
              links={links}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AddressStats data={data}/>
          </Grid>
          <Grid item xs={12} md={10}>
            <RecentTransactionsTable tx_rows={tx_rows} />
          </Grid>


        </Grid>
      </Container>
      <Footer />
    </>
  );
}

AddressSearchedView.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default AddressSearchedView;