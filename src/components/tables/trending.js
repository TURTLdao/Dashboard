import PropTypes from 'prop-types';
import { Box, Button, Card, CardActions, CardHeader, Checkbox, Divider, SvgIcon, IconButton,
  Table, TableBody, TableCell, TableHead, TableRow, Typography, Menu, MenuItem, ListItemIcon
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { SocialIcon } from 'react-social-icons';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { getDaoWatchlistItems } from 'src/sections/dashboard/watchlist-items';

export const TrendingTable = ({ trending_market_data }) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  //const dao_watchlist_items = getDaoWatchlistItems(dao_market_data);

  const openNewTab = (link) => {
    window.open(link);
  };

  const calculate_tokens_to_ada = (tokenPrice) => {
    if (tokenPrice <= 0) {
      return 0; // Invalid tokenPrice
    }

    const out = 1 / tokenPrice;
    if (out < 1) {
      return out.toFixed(5);
    } else {
      return (1 / tokenPrice);
    }
  };

  return (
    <ThemeProvider theme={theme}>
          <Table 
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'primary.main', minWidth: 30 }}>
                  <b><center>Rank</center></b>
                </TableCell>
                <TableCell sx={{ color: 'primary.main', minWidth: 50}}>
                  <b><center>Logo</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 150}}>
                  <b><center>Name</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 150}}>
                  <b><center>Price</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 150}}>
                  <b><center>Marketcap</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 150}}>
                  <b><center>Volume</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 180}}>
                  <div align='center'>
                    <Tooltip title="Some tokens may not have decimals.">
                      <b><center>ADA Compare</center></b>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {
              trending_market_data.map((item, index) => {

                return (
                  <TableRow
                    hover
                  >
                    <TableCell style={{ color: 'white', width: '100%' }}>
                      <center>{index + 1}</center>
                    </TableCell>
                    <TableCell>
                      <center><img src={item.logo} width="30" height="30" /></center>
                    </TableCell>
                    <TableCell style={{ color: 'white', width: '100%' }}>
                      <center>{item.name}</center>
                    </TableCell>
                    <TableCell style={{ color: 'white', width: '100%' }}>
                    <center>₳ {item.price.toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 })}</center>
                  </TableCell>
                  <TableCell style={{ color: 'white', width: '100%' }}>
                    <center>₳ {item.marketCap.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</center>
                  </TableCell>
                  <TableCell style={{ color: 'white', width: '100%' }}>
                    <center>₳ {item.volume.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</center>
                  </TableCell>
                  <TableCell style={{ color: 'white', width: '100%' }}>
                    <center>{calculate_tokens_to_ada(item.price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ${item.ticker}</center>
                  </TableCell>
                
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
    </ThemeProvider>
  );
};

TrendingTable.prototypes = {
  sx: PropTypes.object,
  trending_market_data: PropTypes.object.isRequired,
};