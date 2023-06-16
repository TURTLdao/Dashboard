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

export const DaoWatchlistTable = ({ dao_market_data }) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  const dao_watchlist_items = getDaoWatchlistItems(dao_market_data);

  const openNewTab = (link) => {
    window.open(link);
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
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 100}}>
                  <b><center>Ticker</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 150}}>
                  <b><center>Name</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 150}}>
                  <b><center>Price</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 100}}>
                  <b><center>Marketcap</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 120}}>
                  <b><center>Volume</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 180}}>
                  <div align='center'>
                    <Tooltip title="Some tokens may not have decimals.">
                      <b><center>ADA Compare</center></b>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: '100%'}}>
                  <b><center>TurtleDAO Support</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 100 }}>
                  <b><center>Social</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main', minWidth: 130 }}>
                  <b><center>Dex</center></b>
                </TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
            {
              (dao_watchlist_items).map((item, index) => {

                return (
                  <TableRow
                    hover
                  >
                    <TableCell style={{ color: 'white', width: '100%' }}>
                      <center>{index + 1}</center>
                    </TableCell>
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
                    <TableCell style={{ color: 'white', width: '100%' }}>
                      <center>₳ {item.marketcap.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</center>
                    </TableCell>
                    <TableCell style={{ color: 'white', width: '100%' }}>
                      <center>₳ {item.volume.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</center>
                    </TableCell>
                    <TableCell style={{ color: 'white', width: '100%' }}>
                      <center>{item.to_ada.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} {item.ticker}</center>
                    </TableCell>
                    <TableCell sx={{ width: '100%' }}>
                      <center>
                      {
                      item.dao_support_link ?
                        <Button
                          variant={"contained"}
                          size="small"
                          onClick={() => openNewTab(item.dao_support_link)}
                          sx={{ marginRight: "10px", color: 'white' }}
                        >
                          Go
                        </Button> : <Button
                          variant={"contained"}
                          size="small"
                          sx={{ marginRight: "10px" }}
                          disabled={true}
                        >
                          Go
                        </Button>
                      }
                      </center>
                    </TableCell>

                    <TableCell sx={{ width: '100%' }}>
                      <center>

                      {
                      item.discord_link ?
                        <SocialIcon url={item.discord_link} style={{ height: 25, width: 25, marginRight: 4, marginLeft: 4 }} network="discord"/>
                      :
                        null
                      }

                      {
                      item.twitter_link ?
                        <SocialIcon url={item.twitter_link} style={{ height: 25, width: 25 }} network="twitter"/>
                      :
                        null
                      }
                      </center>

                    </TableCell>
                    <TableCell sx={{ width: '100%' }}>
                      <center>
                      {
                      item.buy_link ?
                        <Button
                          variant={"contained"}
                          size="small"
                          onClick={() => openNewTab(item.buy_link)}
                          sx={{ marginRight: "10px", color: 'white' }}
                        >
                          Buy Now
                        </Button> : <Button
                          variant={"contained"}
                          size="small"
                          sx={{ marginRight: "10px" }}
                          disabled={true}
                        >
                          Buy Now
                        </Button>
                      }
                      </center>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
    </ThemeProvider>
  );
};

DaoWatchlistTable.prototypes = {
  sx: PropTypes.object,
  dao_market_data: PropTypes.object.isRequired,
};