import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, 
  Link, Stack, SvgIcon, Typography
} from '@mui/material';

import { useTheme, ThemeProvider } from '@mui/material/styles';

export const TokenView = (props) => {
  const { nftItems, formatted_prices } = props;
  const theme = useTheme();

  const openNewTab = (link) => {
    window.open(link);
  };


  return (
    <ThemeProvider theme={theme}>
      <Card sx={{
        background: 'radial-gradient(circle, rgba(42,97,44,1) 0%, rgba(45,45,45,1) 100%)',
        border: "2px solid #4CAF50",
        marginLeft: 2,
        marginRight: 2
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
                sx={{ margin: 1 }}
              >
                AAID
              </Button>
              <Button
                variant="contained"
                target='_blank'
                onClick={() => openNewTab(nftItems.buy_link)}
                sx={{ margin: 1 }}
                disabled={!nftItems.buy_link}
              >
                Buy Now
              </Button>
            </div>
          <CardActions>
              <Typography
                color={'white'}
                variant="body2"
              >
                <i>{nftItems.price}</i>
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
