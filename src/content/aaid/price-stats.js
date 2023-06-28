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
import PaidIcon from '@mui/icons-material/Paid';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

const PriceStats = ({ data }) => {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Token Information" />
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
                Price $ADA
              </Typography>
              <Typography variant="h3">
                ₳ {data.price_data.price}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <PeopleIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>

          <Box display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
              >
                Total Holders
              </Typography>
              <Typography variant="h3">
                {data.price_data.holders}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <PaidIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>

          <Box display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
              >
                Daily Volume
              </Typography>
              <Typography variant="h3">
                ₳ {data.price_data.daily_volume}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <AttachMoneyIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>

          <Box display="flex">
            <Box pr={8}>
              <Tooltip placement="top" title={'Fully Diluted Marketcap'}>
                <Typography
                  gutterBottom
                  variant="caption"
                  sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
                >
                  FDM
                </Typography>
              </Tooltip>
              <Typography variant="h3">
                ₳ {data.price_data.fdm}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box px={2} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <CurrencyExchangeIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>

          <Box display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(12)}` }}
              >
                1 ADA Gets
              </Typography>
              <Typography variant="h3">
                {data.price_data.ada_compare} {data.price_data.ticker}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

    </Card>
  );
}

PriceStats.propTypes = {
  data: PropTypes.array.isRequired
};

export default PriceStats;
