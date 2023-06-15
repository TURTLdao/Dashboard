import PropTypes from 'prop-types';
import { Box, Button, Card, CardActions, CardHeader, Divider, SvgIcon, IconButton,
  Table, TableBody, TableCell, TableHead, TableRow, Typography, Menu, MenuItem
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { SocialIcon } from 'react-social-icons';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { getDaoWatchlistItems, getExtWatchlistItems } from 'src/sections/dashboard/watchlist-items';

export const FrontpageWatchlist = ({ market_data }) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  const dao_watchlist_items = getDaoWatchlistItems(market_data);

  // Top 20 by price from All items
  const sortedByItemsPrice = [...dao_watchlist_items].sort((a, b) => b.price - a.price).slice(0, 20);

  const [activeTableTopButton, setActiveTableTopButton] = useState(1);
  const [tableItem, setTableItem] = useState(dao_watchlist_items);
  const [sortedItems, setSortedItems] = useState(tableItem);

  const sortByPrice = () => {
    const sortedByPrice = [...tableItem].sort((a, b) => b.price - a.price);
    // only slice for popular items
    const topItems = (activeTableTopButton === 2) ? sortedByPrice.slice(0, 20) : sortedByPrice;
    setSortedItems(topItems);
  };

  const sortByMarketCap = () => {
    const sortedByMarketCap = [...tableItem].sort((a, b) => b.marketcap - a.marketcap);
    // only slice for popular items
    const topItems = (activeTableTopButton === 2) ? sortedByMarketCap.slice(0, 20) : sortedByMarketCap;
    setSortedItems(topItems);
  };

  const sortByVolume = () => {
    const sortedByVolume = [...tableItem].sort((a, b) => b.volume - a.volume);
    // only slice for popular items
    const topItems = (activeTableTopButton === 2) ? sortedByVolume.slice(0, 20) : sortedByVolume;
    setSortedItems(topItems);
  };

  // Used for Dao items only
  const sortById = () => {
    const sortedById = [...tableItem].sort((a, b) => a.id - b.id);
    setSortedItems(sortedById);
  };

  const openNewTab = (link) => {
    window.open(link);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleTopButtonButtonClick = (btn_name) => {
    switch (btn_name) {
      case 'dao':
        setActiveTableTopButton(1);
        setTableItem(dao_watchlist_items);
        setSortedItems(dao_watchlist_items);
        break;
      case 'popular':
        setActiveTableTopButton(2);
        setTableItem(sortedByItemsPrice);
        setSortedItems(sortedByItemsPrice);
        break;
      case 'all':
        setActiveTableTopButton(3);
        setTableItem(dao_watchlist_items);
        setSortedItems(dao_watchlist_items);
        break;
      default:
        setTableItem(dao_watchlist_items);
        setActiveTableTopButton(1);
        setSortedItems(dao_watchlist_items);
        break;
    }
  };

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
        action={(
          <div>
          {/*
          <Tooltip title="List TurtleDAO supported tokens.">
            <Button
              variant={activeTableTopButton === 1 ? "contained" : "text"}
              size="small"
              onClick={() => handleTopButtonButtonClick('dao')}
              sx={{ marginRight: "10px", color: 'white' }}
            >
              DAO Supported
            </Button>
          </Tooltip>

          <Tooltip title="List tokens not supported by TurtleDAO.">
            <Button
              variant={activeTableTopButton === 2 ? "contained" : "text"}
              size="small"
              onClick={() => handleTopButtonButtonClick('popular')}
              sx={{ marginRight: "10px", color: 'white' }}
            >
              Non-DAO Supported
            </Button>
          </Tooltip>

          <Tooltip title="List all tokens integrated with TurtleDAO.">
            <Button
              variant={activeTableTopButton === 3 ? "contained" : "text"}
              size="small"
              onClick={() => handleTopButtonButtonClick('all')}
              sx={{ marginRight: "10px", color: 'white' }}
            >
              All
            </Button>
          </Tooltip>
        */}
        
        <Tooltip title="Filters tokens.">
          <IconButton onClick={handleOpenMenu} sx={{ marginRight: '20px', color: 'white' }}>
            <SvgIcon fontSize="small">
              <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"></path>
              </svg>
            </SvgIcon>
          </IconButton>
        </Tooltip>
          </div>
        )}
        sx={{ color: 'primary.main'}}
        title="Token Watchlist"
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
    }}>
        <Box  >
    <div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          style: {
            backgroundColor: '#2d2d2d',
            border: "1px solid #4CAF50"
          },
        }}
      >
        <MenuItem sx={{ color: 'primary.main' }} onClick={sortById}>ID</MenuItem>
        <MenuItem sx={{ color: 'primary.main' }} onClick={sortByPrice}>Price</MenuItem>
        <MenuItem sx={{ color: 'primary.main' }} onClick={sortByMarketCap}>Marketcap</MenuItem>
        <MenuItem sx={{ color: 'primary.main' }} onClick={sortByVolume}>Volume</MenuItem>
      </Menu>
    </div>
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
              (sortedItems).map((item, index) => {

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
                      <center>₳ {item.volume.toLocaleString()}</center>
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
        </Box>
      </Scrollbar>
    </Card></ThemeProvider>
  );
};

FrontpageWatchlist.prototypes = {
  sx: PropTypes.object,
  market_data: PropTypes.object.isRequired,
};