import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader,
    IconButton, Divider, Stack, SvgIcon, Typography, Link
  } from '@mui/material';

import { Scrollbar } from 'src/components/scrollbar';
    
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const BuyVerified = ({ verfied_buy_information }) => {

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
        height: 500
      }}>
      <CardHeader
        sx={{ color: 'primary.main' }}
        title={"How to Buy " + verfied_buy_information.ticker}
        action={(
          <div>
            <Button target='_blank' href={verfied_buy_information.buy_link} variant='outlined'>Buy Now</Button>
          </div>
        )}
      />
      <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
              
            }}
          >
            <Typography
              color="white"
              variant="caption"
            >
              Easy guide to buying {verfied_buy_information.ticker} safe.
            </Typography>

            <Card sx={{
                backgroundColor: '#2d2d2d',
                border: "2px solid #4CAF50",
                mt: 2
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
              Step 1 - Create a Wallet
            </Typography>
            <Typography variant="body2"
              color="white">
              Download Eternl or your wallet of choice that support the Cardano blockchain ₳ADA.
            </Typography>
          </Stack>
        </Stack>
        
      </CardContent>
            </Card>

            <Card sx={{
                backgroundColor: '#2d2d2d',
                border: "2px solid #4CAF50",
                mt: 2
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
              Step 2 - Get Some ₳ ADA
            </Typography>
            <Typography variant="body2"
              color="white">
              Download Eternl or your wallet of choice that support the Cardano blockchain ₳ADA.
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
            </Card>
            <Card sx={{
                backgroundColor: '#2d2d2d',
                border: "2px solid #4CAF50",
                mt: 2
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
              Step 3 - Go to Minswap
            </Typography>
            <Typography variant="body2"
              color="white">
              Go to <Link underline='hover'>app.minswap.org</Link> in your the browser or inside your Eternl app.
              Connect your wallet. Because {verfied_buy_information.ticker} is a verified token on Minswap, you can select {verfied_buy_information.ticker} from the list, and confirm.
              When Eternl prompts you for a wallet signature, sign.
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
            </Card>

          </Box>
        </CardContent>

        { /* Dont even ask, lol */}
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
          </Scrollbar>
      </Card></ThemeProvider>
    );
};
