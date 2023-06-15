import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, 
  Link, Stack, SvgIcon, Typography
} from '@mui/material';

import { useTheme, ThemeProvider } from '@mui/material/styles';
import { width } from '@mui/system';

export const TokenView = (props) => {
  const { nftItems, formatted_prices } = props;
  const theme = useTheme();

  const openNewTab = (link) => {
    window.open(link);
  };

  const bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg';

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{
        border: "2px solid #4CAF50",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginLeft: 2,
        marginRight: 2,
        width: '75%'
      }}>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
              <Avatar
                src={nftItems.logo}
                sx={{
                  height: 100,
                  mb: 2,
                  width: 100
                }}
              />
    
              <Typography
                gutterBottom
                variant="h5"
                color="primary.main"
              >
                {nftItems.title}
              </Typography>
    
              <Typography
                color={'white'}
                variant="body2"
              >
                <i>{nftItems.description}</i>
              </Typography>
    
              </Box>
    
              <Divider sx={{ mb: 2, mt: 2}} />
            <div align="center">
              <Button
                variant="contained"
                target='_blank'
                onClick={() => openNewTab(nftItems.page)}
                sx={{ margin: 1, color: 'white', width: '75%' }}
              >
                AAID
              </Button>
            </div>
          <CardActions>
              <Typography
                color={'white'}
                variant="body2"
              >
                <i>₳ {nftItems.price}</i>
              </Typography>
          </CardActions>

          </CardContent>
      </Card>
    </ThemeProvider>
  );
};

TokenView.propTypes = {
  company: PropTypes.object.isRequired
};
