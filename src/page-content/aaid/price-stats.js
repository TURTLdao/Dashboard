import { Box, Typography, Card, CardHeader, Divider, Avatar,
  useTheme, styled, Tooltip
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { useWallet, useWalletList, useLovelace, useAssets, useAddress } from '@meshsdk/react'
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import TollIcon from '@mui/icons-material/Toll';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const { BalanceIcon } = require('src/consts/icons.js');

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(5)};
      height: ${theme.spacing(5)};
`
);

const PriceStats = ({ token_data, info, cardano_fiat_data }) => {
  const theme = useTheme();
  const { connected } = useWallet();
  const assets = useAssets();
  const foundAsset = assets?.find(asset => asset.policyId === info.policy);

  const PRICE_STATS_ITEMS = {
    0: {
      icon: <BalanceIcon />,
      title: 'Price ₳ADA',
      stat: '₳ ' + token_data.price
    },
    1: {
      icon: <ShowChartIcon />,
      title: 'Daily Volume',
      stat: '₳ ' + token_data.daily_volume
    },
    2: {
      icon: <CurrencyExchangeIcon />,
      title: 'Fully Diluted Marketcap',
      stat: '₳ ' + token_data.fdm
    },
    3: {
      icon: <TollIcon />,
      title: '1 ₳ADA Gets',
      stat: `${token_data.ada_compare} ${info.ticker}`
    },
    4: {
      icon: <AssignmentIndIcon />,
      title: 'Total Holders',
      stat: token_data.holders
    },
  }

  return (
    <Card >
      <CardHeader title="Token Information" />

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

PriceStats.propTypes = {
  token_data: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired,
  cardano_fiat_data: PropTypes.object.isRequired
};

export default PriceStats;
