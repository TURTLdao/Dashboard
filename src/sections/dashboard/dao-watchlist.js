import PropTypes from 'prop-types';
import { Box, Button, Card, CardActions, CardHeader, Divider, SvgIcon,
  Table, TableBody, TableCell, TableHead, TableRow, Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { SocialIcon } from 'react-social-icons';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { getDaoWatchlistItems, getExtWatchlistItems } from './watchlist-items';

export const TurtleDaoWatchlist = ({ market_data }) => {
 
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4CAF50"
      }
    }
  });

  const dao_watchlist_items = getDaoWatchlistItems(market_data);
  const ext_watchlist_items = getExtWatchlistItems(market_data);

  // All items: Dao + Ext
  const combinedItems = dao_watchlist_items.concat(ext_watchlist_items);
  // Top 20 by price from All items
  const sortedByItemsPrice = [...combinedItems].sort((a, b) => b.price - a.price).slice(0, 20);

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
        setTableItem(combinedItems);
        setSortedItems(combinedItems);
        break;
      default:
        setTableItem(dao_watchlist_items);
        setActiveTableTopButton(1);
        setSortedItems(dao_watchlist_items);
        break;
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Card sx={{
      background: 'radial-gradient(circle, rgba(42,97,44,1) 0%, rgba(45,45,45,1) 100%)',
      border: "2px solid #4CAF50"
    }}>
      <CardHeader
        action={(
          <div>
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

          <Tooltip title="List the top 20 tokens by Price.">
            <Button
              variant={activeTableTopButton === 2 ? "contained" : "text"}
              size="small"
              onClick={() => handleTopButtonButtonClick('popular')}
              sx={{ marginRight: "10px", color: 'white' }}
            >
              Highest Value
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
          </div>
        )}
        sx={{ color: 'primary.main'}}
        title="TurtleDAO's Token Watchlist"
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
          { // Only show sort by ID when DAO watchlist is active
          activeTableTopButton === 1 ? 
            <Button
              variant={"text"}
              size="small"
              sx={{ marginLeft: "20px", marginBottom: "10px", color: 'white' }}
              onClick={sortById}
            >
              Sort By: ID
            </Button> : null
          }
            <Button
              variant={"text"}
              size="small"
              sx={{ marginLeft: "20px", marginBottom: "10px", color: 'white' }}
              onClick={sortByPrice}
            >
              Sort By: Price
            </Button>
            <Button
              variant={"text"}
              size="small"
              sx={{ marginLeft: "20px", marginBottom: "10px", color: 'white' }}
              onClick={sortByMarketCap}
            >
              Sort By: Marketcap
            </Button>
            <Button
              variant={"text"}
              size="small"
              sx={{ marginLeft: "20px", marginBottom: "10px", color: 'white' }}
              onClick={sortByVolume}
            >
              Sort By: Volume
            </Button>
            
          <Table 
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'primary.main'}}>
                  <b><center>Rank</center></b>
                </TableCell>
                <TableCell sx={{ color: 'primary.main'}}>
                  <b><center>Logo</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main'}}>
                  <b><center>Ticker</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main'}}>
                  <b><center>Name</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main'}}>
                  <b><center>Price</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main'}}>
                  <b><center>Marketcap</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main'}}>
                  <b><center>Volume</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main'}}>
                  <div align='center'>
                    <Tooltip title="Some tokens may not have decimals.">
                      <b><center>ADA Compare</center></b>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main'}}>
                  <b><center>TurtleDAO Support</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main'}}>
                  <b><center>Social</center></b>
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'primary.main'}}>
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
                    <TableCell style={{ color: 'white' }}>
                      <center>{index + 1}</center>
                    </TableCell>
                    <TableCell>
                      <center><img src={item.coin_logo} alt={item.ticker} width="30" height="30" /></center>
                    </TableCell>
                    <TableCell style={{ color: 'white' }}>
                      <center>{item.ticker}</center>
                    </TableCell>
                    <TableCell style={{ color: 'white' }}>
                      <center>{item.name}</center>
                    </TableCell>
                    <TableCell style={{ color: 'white' }}>
                      <center>₳ {item.price.toLocaleString(undefined, { minimumFractionDigits: 10, maximumFractionDigits: 10 })}</center>
                    </TableCell>
                    <TableCell style={{ color: 'white' }}>
                      <center>₳ {item.marketcap.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</center>
                    </TableCell>
                    <TableCell style={{ color: 'white' }}>
                      <center>₳ {item.volume.toLocaleString()}</center>
                    </TableCell>
                    <TableCell style={{ color: 'white' }}>
                      <center>{item.to_ada.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} {item.ticker}</center>
                    </TableCell>
                    <TableCell>
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

                    <TableCell>
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
                    <TableCell>
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

TurtleDaoWatchlist.prototypes = {
  sx: PropTypes.object,
  market_data: PropTypes.string.isRequired,
};