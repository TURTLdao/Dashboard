import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { borderColor } from '@mui/system';

export const BannerCard = ({ message, cardTitle, borderColor }) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  return (
    <div align='center'>
    <ThemeProvider theme={theme}>
    <Card sx={{
      backgroundColor: '#2d2d2d',
      border: "2px solid " + borderColor,
      minWidth: "100%"
    }}>
      <CardContent >
        <Stack
          direction="row"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="primary.main"
              variant="overline"
            >
              {cardTitle}
            </Typography>
            <Typography variant="h6"
              color="white"
            >
              {message}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card></ThemeProvider>
        </div>
  );
};

BannerCard.prototypes = {
  sx: PropTypes.object,
  cardTitle: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  borderColor: PropTypes.object,
};
