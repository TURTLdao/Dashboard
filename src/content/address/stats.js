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

import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BlurOnIcon from '@mui/icons-material/BlurOn';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
`
);

const AddressStats = ({ data }) => {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Wallet Information" />
      <Divider />

      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <AttachMoneyIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>

          <Box display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
              >
                Wallet Balance
              </Typography>
              <Typography variant="h4" sx={{ fontSize: `${theme.typography.pxToRem(24)}` }}>
                ₳ {(data.balance / 1000000).toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 })}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <ReceiptLongIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>

          <Box display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
              >
                Transactions Count
              </Typography>
              <Typography variant="h3">
                {data.tx_count}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <BlurOnIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>

          <Box display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
              >
                Asset Count
              </Typography>
              <Typography variant="h3">
                {data.assets_count}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <AccountBalanceIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>

          <Box display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
              >
                Delegated Pool
              </Typography>
              <Typography variant="h4">
                {data.pool_name}
              </Typography>
              <Typography variant="subtitle2">
                {data.pool_ticker}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

    </Card>
  );
}

AddressStats.propTypes = {
  data: PropTypes.array.isRequired
};

export default AddressStats;
