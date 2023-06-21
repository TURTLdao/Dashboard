import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled
} from '@mui/material';

import Link from 'src/components/Link';

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

const MuiAvatar = styled(Box)(
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
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const JsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

  img {
    width: 60%;
    height: 60%;
    display: block;
  }
`
);

const NextJsAvatar = styled(Box)(
  ({ theme }) => `
  width: ${theme.spacing(8)};
  height: ${theme.spacing(8)};
  border-radius: ${theme.general.borderRadius};
  background-color: #dfebf6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper color="success">Version 1.5a</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            TurtleDAO Platform
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="bold"
          >
            <i>Inspiring trust in TurtleDAO verified projects.</i><br/>
          </TypographyH2>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            Step into a future where transparency and accountability reign supreme, propelling you towards success and unyielding confidence.
          </TypographyH2>
          <Button
            component={Link}
            href="/overview"
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
            href="https://bloomui.com/product/tokyo-free-black-nextjs-javascript-material-ui-admin-dashboard/"
            size="large"
            variant="text"
          >
            Whitepaper
          </Button>
          <Grid container spacing={3} mt={5}>
            <Grid item md={4}>
              <MuiAvatar>
                <img
                  src="https://uploads-ssl.webflow.com/635b615fa5453d42d64fd2aa/63a87504c7b144cc212164b4_TtLogo2.webp"
                  alt="Material-UI"
                />
              </MuiAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Powered by TapTools</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  No BS or subscriptions, just open information for you the user.
                </Typography>
              </Typography>
            </Grid>

            <Grid item md={4}>
              <NextJsAvatar>
                <img style={{ height: '100%', width: '100%' }} src="https://dashboard-assets.dappradar.com/document/18492/jpgstore-dapp-marketplaces-cardano-logo-166x166_e0953ff920425eb5efa762fc5d9db83d.png" alt="NextJS" />
              </NextJsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Powered by JPG.Store</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  Discover NFT information powered by JPG.store
                </Typography>
              </Typography>
            </Grid>

            <Grid item md={4}>
              <JsAvatar>
                <img
                  src="https://seeklogo.com/images/C/cardano-ada-logo-4B6BADDB43-seeklogo.com.png"
                  alt="Javascript"
                />
              </JsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>Built for Cardano</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  TurtleDAOs Platform is built specifically for Cardano
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
