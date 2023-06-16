import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, 
  Link, Stack, SvgIcon, Typography } from '@mui/material';

//import { ADA_LOGO } from 'src/const/images';
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Scrollbar } from 'src/components/scrollbar';

export const NftJPGView = (props) => {
  const { nftItems, isNew } = props;
  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  const bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/basic-bg.svg';

  return (
    <ThemeProvider theme={theme}>
    <Scrollbar
      sx={{
        height: 400,
        width: "auto",
        '& .simplebar-content': {
          height: '100%',
          width: "auto"
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Card sx={{
        border: "2px solid #4CAF50",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginLeft: 2,
        marginRight: 2
      }}>
      <CardHeader
        sx={{ color: 'primary.main' }}
        title={isNew ? 'New: ' + nftItems.display_name : nftItems.display_name}
      />

        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
              <Avatar
                src={nftItems.hero_image}
                sx={{
                  height: 100,
                  mb: 2,
                  width: 100
                }}
              />
              <Typography
                color={'white'}
                variant="body2"
                align='center'
              >
                <i>{nftItems.description}</i>
              </Typography>

              <Typography
                color={'primary.main'}
                variant="sub"
                align='center'
              >
                ₳ {nftItems.global_floor}
              </Typography>

              <Button href={'https://jpg.store/collection' + nftItems.url} variant='contained' sx={{ margin: 1, color: 'white', width: '75%' }}>
                Buy Now
              </Button>
    
              </Box>
    
          </CardContent>
      </Card>
          </Scrollbar>
    </ThemeProvider>
  );
};

NftJPGView.propTypes = {
  company: PropTypes.object.isRequired
};
