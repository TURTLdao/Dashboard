import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, 
  Link, Stack, SvgIcon, Typography } from '@mui/material';

//import { ADA_LOGO } from 'src/const/images';
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import { createTheme, ThemeProvider } from '@mui/material/styles';

export const NftView = (props) => {
  const { nftItems } = props;
  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  let bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/basic-bg.svg';
  if (nftItems.dao_supported === true)
  {
    bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg';
  }

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{
        border: "2px solid #4CAF50",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: 300,
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
                align='center'
              >
                <i>{nftItems.description}</i>
              </Typography>
    
              </Box>
    
            <div align="center" style={{ marginTop: 5 }}>
              <Button
                variant="contained"
                target='_blank'
                href={nftItems.website}
                sx={{ margin: 1 }}
              >
                Website
              </Button>
              <Button
                variant="contained"
                target='_blank'
                href={nftItems.buy_link}
                sx={{ margin: 1 }}
              >
                Buy Now
              </Button>
            </div>

          </CardContent>
      </Card>
    </ThemeProvider>
  );
};

NftView.propTypes = {
  company: PropTypes.object.isRequired
};
