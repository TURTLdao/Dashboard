import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Footer from 'src/components/Footer';

import { Grid, Container } from '@mui/material';

import ProfileCover from 'src/content/Management/Users/details/ProfileCover';
import RecentActivity from 'src/content/Management/Users/details/RecentActivity';
import Feed from 'src/content/Management/Users/details/Feed';
import PopularTags from 'src/content/Management/Users/details/PopularTags';
import MyCards from 'src/content/Management/Users/details/MyCards';
import Addresses from 'src/content/Management/Users/details/Addresses';

import FroggieProfileCover from 'src/content/Management/Users/details/froggie-profilecover';

function ManagementUserProfile() {
  const user = {
    description:
      "Froggie is here for everyone. Froggie is the new wave. Join us in the pond. Froggies are life, Froggies are love and we want Froggies to stay.",
    twitter: 'https://twitter.com/froggieo_',
    website: 'https://froggies.vercel.app/',
    buy_link: 'https://app.minswap.org/swap?currencySymbolA=&tokenNameA=&currencySymbolB=79906b9c8d2fbddeba9658387a2a1187f3edd8f546e5dc49225710a1&tokenNameB=46524f47474945',
  };

  return (
    <>
      <Head>
        <title>User Details - Management</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <FroggieProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          <Grid item xs={12} md={8}>
            <Feed />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
          <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserProfile;
