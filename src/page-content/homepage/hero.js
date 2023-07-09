import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled
} from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'src/components/Link';

const { PLATFORM_VERSION_LONG } = require('src/consts/global.js');

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const PoweredByAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 80%;
      height: 80%;
      display: block;
    }
`
);


function Hero() {
  const turtle_emoji = "\u{1F422}";
  const [currentIndex, setCurrentIndex] = useState(0);

  const powered_by_imgs = [
    '/dao-images/turtledao.png',
    '/dao-images/jpgstore.png',
    '/dao-images/tt.webp',
    'https://smaug.pool.pm/pool.pm-color.svg',
    'https://dash.cardanoscan.io/public/assets/meta/android-icon-192x192.png',
    'https://pbs.twimg.com/profile_images/1601853682680840197/0olJJGNf_400x400.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % powered_by_imgs.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper >{PLATFORM_VERSION_LONG}</LabelWrapper>

          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            The TurtleDAO Platform
          </TypographyH1>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            {turtle_emoji}
          </TypographyH1>

          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 1 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            Cardano's next biggest tool.
          </TypographyH2>

          <Typography
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h5"
            color="text.secondary"
            fontWeight="normal"
          >
            Explore trustworthy and supported projects while also utilizing the platform's tools.
          </Typography>

          <Button
            component={Link}
            href="/dashboard/"
            size="large"
            variant="contained"
          >
            Browse Platform
          </Button>

          <Button
            sx={{ ml: 2 }}
            component="a"
            target="_blank"
            rel="noopener"
            href="https://turtle-docs.vercel.app/whitepaper"
            size="large"
            variant="text"
          >
            View TurtleDAO Whitepaper
          </Button>

          <Grid container spacing={2} mt={5} justifyContent="center">
            <Grid item md={4}>
              <PoweredByAvatar>
                <img
                  src="/dao-images/ada.png"
                  alt="Material-UI"
                />
              </PoweredByAvatar>

              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Built for Cardano</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  The TurtleDAOs Platform is exclusively designed for Cardano.
                </Typography>
              </Typography>
            </Grid>

            <Grid item md={4}>
              <PoweredByAvatar>
                <img
                  src={powered_by_imgs[currentIndex]}
                  alt="Powered By"
                  style={{ transition: 'opacity 1s', opacity: 1 }}
                />
              </PoweredByAvatar>

              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Powered by Cardano</b>
                </Box>

                <Typography component="span" variant="subtitle2">
                  Committed to offering you an exceptional experience without any gimmicks.
                </Typography>
              </Typography>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
