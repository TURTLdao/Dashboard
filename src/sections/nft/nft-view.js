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
