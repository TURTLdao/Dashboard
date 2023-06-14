import { Card, CardContent, CardHeader } from '@mui/material';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

export const TwitterFeed = ({ twitter_handle }) => {
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
        height: 570
    }}>
      <CardHeader
        sx={{ color: 'primary.main' }}
        title={ "Twitter Feed"}
      />
        <CardContent>

          <TwitterTimelineEmbed
            sourceType="profile"
            screenName={twitter_handle}
            theme='dark'
            options={{
              height: 500,
            }}
          />

        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

TwitterFeed.prototypes = {
  sx: PropTypes.object,
  twitter_handle: PropTypes.string.isRequired,
};
