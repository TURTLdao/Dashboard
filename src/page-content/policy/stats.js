import { Box, Typography, Card, CardHeader, Divider, Avatar,
  useTheme, styled, Tooltip
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import ShowChartIcon from '@mui/icons-material/ShowChart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import TollIcon from '@mui/icons-material/Toll';
import PercentIcon from '@mui/icons-material/Percent';

const { BalanceIcon } = require('src/consts/icons.js');

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(5)};
      height: ${theme.spacing(5)};
`
);

const PolicyStats = ({ policy_data, cardano_fiat_data }) => {
  const theme = useTheme();

  const PRICE_STATS_ITEMS = {
    0: {
      icon: <BalanceIcon />,
      title: 'Price ₳ADA',
      stat: '₳ ' + policy_data.asset_data.market_details.price
    },
    1: {
      icon: <ShowChartIcon />,
      title: 'Daily Volume',
      stat: '₳ ' + policy_data.asset_data.market_details.daily_volume
    },
    2: {
      icon: <CurrencyExchangeIcon />,
      title: 'Fully Diluted Marketcap',
      stat: '₳ ' + policy_data.asset_data.market_details.market_cap
    },
    3: {
      icon: <PercentIcon />,
      title: 'Price Change',
      stat: '24h:  ' + policy_data.asset_data.market_details.price_change?.twofour,
      stat2: '7d:  ' + policy_data.asset_data.market_details.price_change?.seven,
      stat3: '30d:  ' + policy_data.asset_data.market_details.price_change?.thirty,
    },
    ...(policy_data.asset_data.market_details.one_ada_gets
      ? {
          4: {
            icon: <TollIcon />,
            title: '1 ₳ADA Gets',
            stat: policy_data.asset_data.market_details.one_ada_gets,
            stat2: '$' + policy_data.asset_data.ticker,
          }
        }
      : {}),
  }

  const getStatColor = (value) => {
    if (typeof value !== 'string') {
      return theme.colors.primary.main; // Return color for positive values
    }
    
    return value.includes('-') ? '#FF5733' : theme.colors.primary.main;
  };

  return (
    <Card >
      <CardHeader title="Market Information" />

      <Divider />

      {
      Object.entries(PRICE_STATS_ITEMS).map(([key, value], index) => {

        return (
          <>
            <Box px={2} py={2} display="flex" alignItems="flex-start" key={key}>
              <AvatarPrimary>
                {value.icon}
              </AvatarPrimary>

              <Box pl={2} flex={1}>
                <Box display="flex">
                  <Box pr={8}>
                    {
                      index === 3 ? 
                      <>
                      <Typography
                        gutterBottom
                        variant="caption"
                        sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
                      >
                        {value.title}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Typography variant="h5" display="block">
                          24h:
                        </Typography>
                        <Typography
                          variant="body2"
                          display="block"
                          sx={{ color: getStatColor(policy_data.asset_data.market_details.price_change?.twofour), ml: 1 }}
                        >
                          {policy_data.asset_data.market_details.price_change?.twofour}
                        </Typography>
                        </Box>

                        <Box display="flex" alignItems="center">
                        <Typography variant="h5" display="block">
                          7d:
                        </Typography>
                        <Typography
                          variant="body2"
                          display="block"
                          sx={{ color: getStatColor(policy_data.asset_data.market_details.price_change?.seven), ml: 1 }}
                        >
                          {policy_data.asset_data.market_details.price_change?.seven}
                        </Typography>
                        </Box>

                        <Box display="flex" alignItems="center">
                        <Typography variant="h5" display="block">
                          30d:
                        </Typography>
                        <Typography
                          variant="body2"
                          display="block"
                          sx={{ color: getStatColor(policy_data.asset_data.market_details.price_change?.thirty), ml: 1 }}
                        >
                          {policy_data.asset_data.market_details.price_change?.thirty}
                        </Typography>
                        </Box>
                      </>
                        :
                        <>
                        <Typography
                          gutterBottom
                          variant="caption"
                          sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
                        >
                          {value.title}
                        </Typography>
                        <Typography variant="h4">
                          {value.stat}
                        </Typography>
                        <Typography variant="caption">
                          {value.stat2}
                        </Typography>
                        </>
                    }
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider />
          </>
        );})
      }

    </Card>
  );
}

PolicyStats.propTypes = {
  policy_data: PropTypes.object.isRequired,
  cardano_fiat_data: PropTypes.object.isRequired,
};

export default PolicyStats;
