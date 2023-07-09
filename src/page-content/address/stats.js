import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
  Tooltip
} from '@mui/material';
import PropTypes from 'prop-types';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BlurOnIcon from '@mui/icons-material/BlurOn';

const { BalanceIcon } = require('src/consts/icons.js');

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
`
);

const AddressStats = ({ address_data }) => {
  const theme = useTheme();

  const PRICE_STATS_ITEMS = {
    0: {
      icon: <BalanceIcon />,
      title: 'Wallet Balance',
      stat: '₳ ' + (address_data.adastat_data.address_data.balance / 1000000).toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 })
    },
    1: {
      icon: <ReceiptLongIcon />,
      title: 'Wallet Transactions',
      stat: (address_data.adastat_data.address_data.tx).toLocaleString()
    },
    2: {
      icon: <BlurOnIcon />,
      title: 'Assets Count',
      stat: (address_data.adastat_data.address_data.token).toLocaleString()
    },
    3: {
      icon: <AccountBalanceIcon />,
      title: 'Delegated Pool',
      stat: address_data.adastat_data.address_data.pool_name,
      stat2: '$' + address_data.adastat_data.address_data.pool_ticker,
    },
  }

  return (
    <Card sx={{ mt: 10 }}>
      <CardHeader title="Wallet Information" />

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
                    { value.stat2 ?
                      <Typography variant="caption">
                        {value.stat2}
                      </Typography>
                      :
                      null
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

AddressStats.propTypes = {
  address_data: PropTypes.array.isRequired
};

export default AddressStats;
