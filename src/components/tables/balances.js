import PropTypes from 'prop-types';
import { Box, Button, Card, CardActions, CardHeader, Divider, SvgIcon, IconButton,
  Table, TableBody, TableCell, TableHead, TableRow, Typography, Menu, MenuItem
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { SocialIcon } from 'react-social-icons';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// wallet_data = Blockfrost Adapter response /addresses/{address}
// amount = []
// stake_address = string
export const BalancesTable = ({ wallet_data }) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  const wallet_amounts = wallet_data.amount;

  const [sortedItems, setSortedItems] = useState(wallet_amounts);

  const bg = 'https://raw.githubusercontent.com/TURTLdao/TURTL-images/main/dao-bg.svg';

  return (
    <ThemeProvider theme={theme}>
    <Card sx={{
      border: "2px solid #4CAF50",
      backgroundImage: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}>
      <CardHeader
        sx={{ color: 'primary.main'}}
        title="Address Balances"
      />

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
        <Box >
          <Table >

            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'primary.main', minWidth: 50}}>
                  <b><center>Logo</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 100}}>
                  <b><center>Ticker</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 150}}>
                  <b><center>Name</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 150}}>
                  <b><center>Price</center></b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {
              (sortedItems).map((item, index) => {

                return (
                  <TableRow
                    hover
                  >
                    <TableCell>
                      <center><img src={item.coin_logo} alt={item.ticker} width="30" height="30" /></center>
                    </TableCell>
                    <TableCell style={{ color: 'white', width: '100%' }}>
                      <center>{item.ticker}</center>
                    </TableCell>
                    <TableCell style={{ color: 'white', width: '100%' }}>
                      <center>{item.name}</center>
                    </TableCell>
                    <TableCell style={{ color: 'white', width: '100%' }}>
                      <center>₳ {item.price.toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 })}</center>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card></ThemeProvider>
  );
};

BalancesTable.prototypes = {
  sx: PropTypes.object,
  wallet_data: PropTypes.object.isRequired,
};