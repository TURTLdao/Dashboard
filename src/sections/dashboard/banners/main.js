import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader,
  IconButton, Divider, Stack, SvgIcon, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

export const MainBanner = ({  }) => {
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

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{
        background: 'radial-gradient(circle, rgba(42,97,44,1) 0%, rgba(45,45,45,1) 100%)',
        border: "2px solid #4CAF50",
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
              v1.3
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

MainBanner.prototypes = {
  sx: PropTypes.object,
};
