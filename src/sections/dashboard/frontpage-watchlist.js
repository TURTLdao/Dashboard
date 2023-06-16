import PropTypes from 'prop-types';
import { Box, Button, Card, CardActions, CardHeader, Checkbox, Divider, SvgIcon, IconButton,
  Table, TableBody, TableCell, TableHead, TableRow, Typography, Menu, MenuItem, ListItemIcon
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { SocialIcon } from 'react-social-icons';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { getDaoWatchlistItems, getExtWatchlistItems } from 'src/sections/dashboard/watchlist-items';

import { DaoWatchlistTable } from 'src/components/tables/dao-watchlist';
import { TrendingTable } from 'src/components/tables/trending';

export const FrontpageWatchlist = ({ dao_market_data, trending_market_data }) => {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  const dao_watchlist_items = getDaoWatchlistItems(dao_market_data);

  // Top 20 by price from All items
  const sortedByItemsPrice = [...dao_watchlist_items].sort((a, b) => b.price - a.price).slice(0, 20);

  const [activeTableTopButton, setActiveTableTopButton] = useState(1);
  const [tableItem, setTableItem] = useState(dao_watchlist_items);
  const [sortedItems, setSortedItems] = useState(tableItem);
  const [viewAllTokens, setViewAllTokens] = useState(false); 

  const [viewTrendingTokens, setViewTrendingTokens] = useState(false); 

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

  const toggleTrendingVisibility = () => {
    setViewTrendingTokens(!viewTrendingTokens);
  };

  const handleCheckboxClick = (btn_name) => {
    switch (btn_name) {
      case 'dao':
        setActiveTableTopButton(1);
        setTableItem(dao_watchlist_items);
        setSortedItems(dao_watchlist_items);
        break;
      case 'all':
        setActiveTableTopButton(2);
        setTableItem(sortedByItemsPrice);
        setSortedItems(sortedByItemsPrice);
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
            {
              !viewTrendingTokens ?
              <div>
              <Tooltip title="Filters tokens.">
                <IconButton onClick={handleOpenMenu} sx={{ marginRight: '20px', color: 'white' }}>
                  <SvgIcon fontSize="small">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"></path>
                    </svg>
                  </SvgIcon>
                </IconButton>
              </Tooltip>
                <Tooltip title="Top 25 Cardano Tokens by Volume.">
                  <Button onClick={toggleTrendingVisibility} variant='contained' sx={{ color: 'white' }}>
                    {'View Trending'}
                  </Button>
                </Tooltip>
              </div>
              :
              <Button onClick={toggleTrendingVisibility} variant='contained' sx={{ color: 'white' }}>
                View DAO
              </Button>
            }

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
        }}
      >
        <Box >
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
            {
              !viewTrendingTokens ?
                <div>
                  <MenuItem sx={{ color: 'primary.main' }} onClick={sortById}>ID</MenuItem>
                  <MenuItem sx={{ color: 'primary.main' }} onClick={sortByPrice}>Price</MenuItem>
                  <MenuItem sx={{ color: 'primary.main' }} onClick={sortByMarketCap}>Marketcap</MenuItem>
                  <MenuItem sx={{ color: 'primary.main' }} onClick={sortByVolume}>Volume</MenuItem>
                </div>
              : null
            }
            
          </Menu>
        </div>
        {
          !viewTrendingTokens ?
            <DaoWatchlistTable dao_market_data={dao_market_data}/>
          :
            <TrendingTable trending_market_data={trending_market_data}/>
        }

        </Box>
      </Scrollbar>
    </Card></ThemeProvider>
  );
};

FrontpageWatchlist.prototypes = {
  sx: PropTypes.object,
  dao_market_data: PropTypes.object.isRequired,
  trending_market_data: PropTypes.object.isRequired,
};