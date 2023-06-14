import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const PriceCard = ({ lastPrice, sx, imageLink, cardTitle }) => {

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
      backgroundImage: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      border: "2px solid #4CAF50"
    }}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="primary.main"
              variant="overline"
            >
              {cardTitle}
            </Typography>
            <Typography variant="h5"
              color="white"
            >
              ₳ {lastPrice}
            </Typography>
          </Stack>
          {imageLink ? (
            <Avatar
              sx={{
                backgroundColor: '#fff',
                height: 56,
                width: 56
              }}
              src={imageLink}
            />
          ) : null}
        </Stack>

      </CardContent>
    </Card></ThemeProvider>
  );
};

PriceCard.prototypes = {
  sx: PropTypes.object,
  lastPrice: PropTypes.string.isRequired,
  imageLink: PropTypes.string,
  cardTitle: PropTypes.string.isRequired,
};
