import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import BaseLayout from 'src/layouts/BaseLayout';

import Link from 'src/components/Link';
import Head from 'next/head';

import Logo from 'src/components/LogoSign';
import Hero from 'src/page-content/homepage/hero';

function Homepage({ }) {
  return (
    <OverviewWrapper>
      <Head>
        <title>The TurtleDAO Platform</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
                <Button
                  component={Link}
                  href="/dashboard/"
                  variant="contained"
                  sx={{ ml: 2 }}
                  size='small'
                >
                  Browse Platform
                </Button>

                <Button
                  component={Link}
                  href="https://twitter.com/_TurtleDAO"
                  target='_blank'
                  variant="outlined"
                  sx={{ ml: 2, borderColor: '#00acee', color: '#00acee' }}
                  size='small'
                >
                  Follow Twitter
                </Button>

                <Button
                  component={Link}
                  href="https://discord.gg/FNQ2BXpqkM"
                  target='_blank'
                  variant="outlined"
                  sx={{ ml: 2, borderColor: '#7289DA', color: '#7289DA' }}
                  size='small'
                >
                  Join Discord
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography textAlign="center" variant="subtitle1">
          Made with ♥ by {' '}
          <Link
            href="https://turtledao.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TurtleDAO
          </Link>
          {' \u{1F422}'}
        </Typography>
      </Container>
    </OverviewWrapper>
  );
}

export default Homepage;

Homepage.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
