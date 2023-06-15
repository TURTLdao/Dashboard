import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader,
  IconButton, Divider, Stack, SvgIcon, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

export const VersionBanner = ({  }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  const [visible, setVisible] = useState(true);

  const handleIconClick = () => {
    setVisible(false);
  };

  if (!visible) {
    return null; // Return null to hide/remove the component
  }

  const bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg';

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{
        border: "2px solid #4CAF50",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        maxHeight: 170
      }}>
        <CardContent>
            <Typography
              color="primary.main"
              variant="h6"
              sx={{   }}
            >
              TurtleDAO Platform
            </Typography>

            <Typography
              color="yellow"
              variant="caption"
              sx={{ marginBottom: 1 }}
            >
              v1.4.2
            </Typography>

            <Typography
              color="white"
              variant="body2"
              sx={{ marginBottom: 1 }}
            >
              Currently in a beta, TurtleDAO has released its platform for public usage.<br/>
              Users are welcomed to give feedback using Twitter and Discord.
            </Typography>
          <div>
          <Button 
            sx={{ mr: 3 }}
            onClick={handleIconClick}
          >
            Close Message
          </Button>
          </div>
        </CardContent>
    
      </Card>
    </ThemeProvider>
  );
};

VersionBanner.prototypes = {
  sx: PropTypes.object,
};
