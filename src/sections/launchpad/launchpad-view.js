import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Avatar, Box, Button, Card, CardContent, Divider, 
  Link, Stack, SvgIcon, Typography } from '@mui/material';

//import { ADA_LOGO } from 'src/const/images';
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import { createTheme, ThemeProvider } from '@mui/material/styles';

export const LaunchpadView = (props) => {
  const { company } = props;
  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  const bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg';

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{
        border: "2px solid #4CAF50",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src={company.logo}
            variant="square"
            sx={{ width: 50, height: 50}}
          />
        </Box>

        <Typography
          align="center"
          gutterBottom
          variant="h5"
          color={'white'}
        >
          {company.title}
        </Typography>

        <Stack
          alignItems="center"
          spacing={1}
        >
          <Button>
            {company.category}
          </Button>
        </Stack>

        <Typography
          align="center"
          variant="subtitle1"
          color={'primary.main'}
        >
          <b>{company.ticker}</b>
        </Typography>
        <Typography
          align="center"
          variant="body1"
          color={'white'}
        >
          <i>{company.description}</i>
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <Typography
            color={'primary.main'}
            display="inline"
            variant="body2"
          >
            ₳ {company.price}
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
        <div>
          <Link
          component={NextLink}
          href={company.page}
          underline="hover"
          variant="subtitle2"
        >

        <div >
        {

        <Button
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          variant="contained"
          disabled={!company.ready}
          sx={{ color: 'white' }}
        >
          Discover
        </Button>

        }
        </div>

        </Link>
        </div>
        </Stack>
      </Stack>
    </Card>
    </ThemeProvider>
  );
};

LaunchpadView.propTypes = {
  company: PropTypes.object.isRequired
};
