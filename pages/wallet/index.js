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

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AssetView from 'src/content/wallet/asset-view'
import { fetchFloorPriceJpgStore, fetchCardanoPrice, fetchTTdata } from 'src/api/fetch-calls'

export async function getServerSideProps() {
  const jpgIDs = [
    '263eb3e3c980c15305f393dc7a2f6289ba12732b6636efe46d6e2c16', // The Turtle Syndicate
    '3929accff4dcfe4e0b2e24798e97d9a7d99d20f011c3b3668965d2da', // Racoons Club
    '787a6798527b21ad0e0f62c021b4ce036513a2d3342b5cb519d2ca19', // Platypus Cyberpunks
    'f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a', // $adahandle
    '3b0b923ec2cb5541ffb46b5a4c659c6edee0af60b32ec6061d9ea1eb', // Syndicate Shell Pass
    'b77791d20054db4fa9726a58854b8c02550277c8683286ec5a353b89', // CatNip
  ];

  const ada_id = '0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1'
  const ttIDs = [
    '', // res for $TURTL
    ada_id + '.1075ae9bcffa581ce9bc3a67d1cfdb1471ca8b62dd56ba0d065275682a7e8258', // $FROGGIE
    ada_id + '.d3c99ba691189e9be4e524ee1453d8aa4436d504432ec9be264f8a037f7b6840', // $KONDA
    ada_id + '.76ab3fb1e92b7a58ee94b712d1c1bff0e24146e8e508aa0008443e1db1f2244e', // $CATSKY
    ada_id + '.778854dfbdabfd15860e20ade792f635cca51d27a45eae9083582889fc256938', // $RCCN
    ada_id + '.ccd6ccf11c5eab6a9964bc9a080a506342a4bb037209e100f0be238da7495a9c', // $TORTOL
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
      fetchCardanoPrice(),
      fetchFloorPriceJpgStore(jpgIDs[0]),
      fetchFloorPriceJpgStore(jpgIDs[1]),
      fetchFloorPriceJpgStore(jpgIDs[2]),
      fetchFloorPriceJpgStore(jpgIDs[3]),
      fetchTTdata(ttIDs[1]),
      fetchTTdata(ttIDs[2]),
      fetchTTdata(ttIDs[3]),
      fetchTTdata(ttIDs[4]),
      fetchTTdata(ttIDs[5]),
      fetchFloorPriceJpgStore(jpgIDs[4]),
      fetchFloorPriceJpgStore(jpgIDs[5]),
    ]);

    const { ada_usd: usd, ada_eur: eur, ada_gbp: gbp } = results[0];

    const { floor_price: TTSTurtle_FP } = results[1];
    const { floor_price: RacoonClub_FP } = results[2];
    const { floor_price: Platypus_FP } = results[3];
    const { floor_price: Adahandle_FP } = results[4];

    const { nativePrice: froggie_price, dailyVolume: froggie_volume,
      holders: froggie_holders, numTransactions: froggie_transactions,
      pricePercentChange: froggie_daily_percent, weekPercentChange: froggie_weekly_percent,
      monthPercentChange: froggie_monthly_percent, dilutedMarketCap: froggie_fdm } = results[5];
    const { nativePrice: konda_price, dailyVolume: konda_volume,
      holders: konda_holders, numTransactions: konda_transactions,
      pricePercentChange: konda_daily_percent, weekPercentChange: konda_weekly_percent,
      monthPercentChange: konda_monthly_percent, dilutedMarketCap: konda_fdm } = results[6];
    const { nativePrice: catsky_price, dailyVolume: catsky_volume,
      holders: catsky_holders, numTransactions: catsky_transactions,
      pricePercentChange: catsky_daily_percent, weekPercentChange: catsky_weekly_percent,
      monthPercentChange: catsky_monthly_percent, dilutedMarketCap: catsky_fdm } = results[7];
    const { nativePrice: rccn_price, dailyVolume: rccn_volume,
      holders: rccn_holders, numTransactions: rccn_transactions,
      pricePercentChange: rccn_daily_percent, weekPercentChange: rccn_weekly_percent,
      monthPercentChange: rccn_monthly_percent, dilutedMarketCap: rccn_fdm } = results[8];
    const { nativePrice: tortol_price, dailyVolume: tortol_volume,
      holders: tortol_holders, numTransactions: tortol_transactions,
      pricePercentChange: tortol_daily_percent, weekPercentChange: tortol_weekly_percent,
      monthPercentChange: tortol_monthly_percent, dilutedMarketCap: tortol_fdm } = results[8];

    const { floor_price: SyndicateShellPass_FP } = results[9];
    const { floor_price: CatNip_FP } = results[10];

    const ttsturtle_data = {
      floor_price: parseInt(TTSTurtle_FP) / 1000000,
      usd_price: usd * parseInt(TTSTurtle_FP) / 1000000,
      eur_price: eur * parseInt(TTSTurtle_FP) / 1000000,
      gbp_price: gbp * parseInt(TTSTurtle_FP) / 1000000,
      logo: 'https://res.cloudinary.com/dkjdnfj7u/image/upload/c_limit,w_176/q_auto:best/v1678458115/collections/hero_image/90bd003b-a3f2-4b09-88a3-82de278b2eac?_a=ATCqVAA0.webp',
    }
    const racoonsclub_data = {
      floor_price: parseInt(RacoonClub_FP) / 1000000,
      usd_price: usd * parseInt(RacoonClub_FP) / 1000000,
      eur_price: eur * parseInt(RacoonClub_FP) / 1000000,
      gbp_price: gbp * parseInt(RacoonClub_FP) / 1000000,
      logo: 'https://storage.googleapis.com/jpeg-optim-files/f3ec3660-a126-45e1-903c-a5b9a811bdda',
    }
    const platypus_data = {
      floor_price: parseInt(Platypus_FP) / 1000000,
      usd_price: usd * parseInt(Platypus_FP) / 1000000,
      eur_price: eur * parseInt(Platypus_FP) / 1000000,
      gbp_price: gbp * parseInt(Platypus_FP) / 1000000,
      logo: 'https://res.cloudinary.com/dkjdnfj7u/image/upload/c_limit,w_176/q_auto:best/v1680291553/collections/hero_image/565f0a39-3878-4ada-87af-07e3c4952f1e?_a=ATCqVAA0.webp',
    }
    const adahandle_data = {
      floor_price: parseInt(Adahandle_FP) / 1000000,
      usd_price: usd * parseInt(Adahandle_FP) / 1000000,
      eur_price: eur * parseInt(Adahandle_FP) / 1000000,
      gbp_price: gbp * parseInt(Adahandle_FP) / 1000000,
      logo: 'https://res.cloudinary.com/dkjdnfj7u/image/upload/c_limit,w_176/q_auto:best/v1678458230/collections/hero_image/adahandle?_a=ATCqVAA0.webp',
    }
    const sspass_data = {
      floor_price: parseInt(SyndicateShellPass_FP) / 1000000,
      usd_price: usd * parseInt(SyndicateShellPass_FP) / 1000000,
      eur_price: eur * parseInt(SyndicateShellPass_FP) / 1000000,
      gbp_price: gbp * parseInt(SyndicateShellPass_FP) / 1000000,
      logo: 'https://res.cloudinary.com/dkjdnfj7u/image/upload/c_limit,w_176/q_auto:best/v1678457880/collections/hero_image/d751ec61-9153-4c5b-93f8-c828019c550a?_a=ATCqVAA0.webp',
    }
    const catnip_data = {
      floor_price: parseInt(CatNip_FP) / 1000000,
      usd_price: usd * parseInt(CatNip_FP) / 1000000,
      eur_price: eur * parseInt(CatNip_FP) / 1000000,
      gbp_price: gbp * parseInt(CatNip_FP) / 1000000,
      logo: 'https://pbs.twimg.com/profile_images/1664260164050993152/p9KwKZ1U_400x400.jpg',
    }

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
      ada_compare: calculate_tokens_to_ada(froggie_price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      website: 'https://froggies.vercel.app/',
      buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a1&tokenNameB=46524f47474945',
      aaid: '/aaid/froggie',
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
      ada_compare: calculate_tokens_to_ada(konda_price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      website: 'https://adakondacoin.com/',
      buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=501dd5d2fbab6af0a26b1421076ff3afc4d5a34d6b3f9694571116ea&tokenNameB=4b4f4e4441',
      aaid: '/aaid/konda',
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
      ada_compare: calculate_tokens_to_ada(catsky_price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      website: 'https://catsky.io/',
      buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=9b426921a21f54600711da0be1a12b026703a9bd8eb9848d08c9d921&tokenNameB=434154534b59',
      aaid: '/aaid/catsky',
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
      ada_compare: calculate_tokens_to_ada(rccn_price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      website: 'https://racoonsclub.io/',
      buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=a3e9d397a62992efd2bb54c954b59044948f11f4e14b28add5ebd847&tokenNameB=5243434e',
      aaid: '/aaid/rccn',
    }
    const tortol_data = {
      price: Number(tortol_price).toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 }),
      daily_volume: Number(tortol_volume).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      holders: Number(tortol_holders).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      transactions: Number(tortol_transactions).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      fdm: Number(tortol_fdm).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      percent_change: {
        daily: tortol_daily_percent,
        weekly: tortol_weekly_percent,
        monthly: tortol_monthly_percent,
      },
      ada_compare: calculate_tokens_to_ada(tortol_price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      website: 'https://www.theturtlesyndicate.xyz/',
      buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=52162581184a457fad70470161179c5766f00237d4b67e0f1df1b4e6&tokenNameB=5452544c',
      aaid: '/aaid/tortol',
    }

    const fiat = [usd, gbp, eur]

    const full_data = { ttsturtle_data, racoonsclub_data, platypus_data, adahandle_data, sspass_data,
      catnip_data,

      froggie_data, konda_data, catsky_data, rccn_data, tortol_data,
      fiat }

    return {
      props: {
        full_data
      },
    };
  } catch (error) {
    console.error('Error:', error);
    
    const full_data = { }
    return {
      props: {
        full_data
      },
    };
  }
}


function WalletView({ full_data }) {

  return (
    <>
      <Head>
        <title>Cards - Components</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Wallet Assets"
          subHeading="Find out about the assets you hold within your wallet."
          subHeading2="This is a beta so not all NFTs are supported but they will still be listed."
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
            <AssetView data={full_data}/>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

WalletView.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default WalletView;